import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';

import { City, Paginate, State, Table } from 'src/app/interfaces';

import { CityService } from 'src/app/cities/services/city.service';
import { StateService } from '../../services/state.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './details-page.component.html',
  styles: [
  ]
})
export class DetailsPageComponent {
  public state: State = {
    id: 0,
    name: "",
    countryId: 0
  };

  public countryId: number = 0;
  public stateId: number = 0;

  public cities: City[] = [];
  public totalCities: number = 0;
  
  public columns: Table[] = [
    { columnHeater: 'name',  columnHeaterValue: 'Cuidad'},
  ];
  
  constructor(
    private stateService: StateService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private validatorService: ValidatorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validatorService.showLoading(true);
    this.loadState();
  }

  loadState() {
    this.activatedRoute.params
    .pipe(
      tap( ({ id }) => this.stateId = id ),
      switchMap( ({ id }) => this.stateService.getState( id ) ),
      catchError(({ error, status })  => {
        if (status == '404') {
          this.validatorService.showLoading(false);
          this.goBack();
        } else {
          Swal.fire({
            icon: "error",
            title: 'Error',
            text: status != 0 ? error : "Ha ocurrido un error inesperado"
          });
          this.validatorService.showLoading(false);
        }
        return of();
      })
    )
    .subscribe( state => {

      if ( !state ) {
       this.goBack();
      }

      this.state = state;
      this.countryId = this.state.countryId
      this.loadCities();
    });
  }

  loadCities(page: number = 1, filter: string = '') {
    this.validatorService.showLoading(true);
    this.cityService.getCities(this.stateId, page, filter)
    .pipe(
      catchError(({ error, status })  => {
        Swal.fire({
          icon: "error",
          title: 'Error',
          text: status != 0 ? error : "Ha ocurrido un error inesperado"
        });
        this.validatorService.showLoading(false);
        return of();
      })
    )
    .subscribe( cities => {
      this.cityService.getTotalCities(this.stateId, filter)
      .pipe(
        catchError(({ error, status })  => {
          Swal.fire({
            icon: "error",
            title: 'Error',
            text: status != 0 ? error : "Ha ocurrido un error inesperado"
          });
          this.validatorService.showLoading(false);
          return of();
        })
      )
      .subscribe( total => {
        this.cities = cities;
        this.totalCities = total;
        this.validatorService.showLoading(false);
      });
    });
  }

  onPageChange(paginate: Paginate) {
    this.loadCities(paginate.page, paginate.filter);
  }

  gotoCreateState() {
    this.router.navigate(['city/add', this.stateId]);
  }

  gotoUpdateState(id: number) {
    this.router.navigate(['city/edit', id]);
  }

  deleteState(id: number) {
    Swal.fire<Boolean>({
      icon: 'question',
      title: 'Confirmación',
      text: "¿Realmente deseas eliminar el registro?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si"
    }). then(result => {
      if ( result.isConfirmed ) {
        this.validatorService.showLoading(true);
        this.cityService.deleteCity(id)
        .pipe(
          catchError(({ error, status })  => {
            Swal.fire({
              icon: "error",
              title: 'Error',
              text: status != 0 ? error : "Ha ocurrido un error inesperado"
            });
            this.validatorService.showLoading(false);
            return of();
          })
        )
        .subscribe(()=> {
          this.loadState();
        })
      } else {
        return;
      }
    });
  }

  goBack() {
    this.router.navigate(['country/details', this.countryId]);
  }
}
