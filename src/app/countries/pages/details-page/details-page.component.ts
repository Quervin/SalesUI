import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';

import { Country, Paginate, State, Table } from 'src/app/interfaces';

import { CountryService } from '../../services/country.service';
import { StateService } from 'src/app/states/services/state.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './details-page.component.html',
  styles: [
  ]
})
export class DetailsPageComponent implements OnInit {

  public country: Country = {
    id: 0,
    name: "",
    statesNumber: 0
  };

  public countryId: number = 0;

  public states: State[] = [];
  public totalStates: number = 0;

  public columns: Table[] = [
    { columnHeater: 'name', columnHeaterValue: 'Estado / Departamentos' },
    { columnHeater: 'citiesNumber', columnHeaterValue: 'Cuidates' }
  ];

  constructor(
    private countryService: CountryService,
    private stateService: StateService,
    private activatedRoute: ActivatedRoute,
    private validatorService: ValidatorsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCountry();
  }

  loadCountry() {
    this.validatorService.showLoading(true);
    this.activatedRoute.params
      .pipe(
        tap(({ id }) => this.countryId = id),
        switchMap(({ id }) => this.countryService.getCountry(id)),
        catchError(({ error, status }) => {
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
      .subscribe(country => {

        if (!country) {
          this.goBack();
        }

        this.country = country;
        this.loadStates();

      });
  }

  loadStates(page: number = 1, filter = '') {
    this.validatorService.showLoading(true);
    this.stateService.getStates(this.countryId, page, filter)
      .pipe(
        catchError(({ error, status }) => {
          Swal.fire({
            icon: "error",
            title: 'Error',
            text: status != 0 ? error : "Ha ocurrido un error inesperado"
          });
          this.validatorService.showLoading(false);
          return of();
        })
      )
      .subscribe(states => {
        this.stateService.getTotalStates(this.countryId, filter)
          .pipe(
            catchError(({ error, status }) => {
              Swal.fire({
                icon: "error",
                title: 'Error',
                text: status != 0 ? error : "Ha ocurrido un error inesperado"
              });
              this.validatorService.showLoading(false);
              return of();
            })
          )
          .subscribe(total => {
            this.states = states;
            this.totalStates = total
            this.validatorService.showLoading(false);
          })
      })
  }

  onPageChange(paginate: Paginate) {
    this.loadStates(paginate.page, paginate.filter);
  }

  gotoCreateState() {
    this.router.navigate(['state/add', this.countryId]);
  }

  gotoStateDetails(id: number) {
    this.router.navigate(['state/details', id]);
  }

  gotoUpdateState(id: number) {
    this.router.navigate(['state/edit', id]);
  }

  deleteState(id: number) {
    Swal.fire<Boolean>({
      icon: 'question',
      title: 'Confirmación',
      text: "¿Realmente deseas eliminar el registro?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Si"
    }).then(result => {
      if (result.isConfirmed) {
        this.validatorService.showLoading(true);
        this.stateService.deleteState(id)
          .pipe(
            catchError(({ error, status }) => {
              Swal.fire({
                icon: "error",
                title: 'Error',
                text: status != 0 ? error : "Ha ocurrido un error inesperado"
              });
              this.validatorService.showLoading(false);
              return of();
            })
          )
          .subscribe(() => {
            this.loadCountry();
          })
      } else {
        return;
      }
    });
  }

  goBack() {
    this.router.navigate(['country/list']);
  }

}
