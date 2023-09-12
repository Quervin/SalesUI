import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

import { Country, Paginate, Table } from 'src/app/interfaces';

import { CountryService } from '../../services/country.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public countries: Country[] = [];
  public totalCountries: number = 0;
  public columns: Table[] = [
    { columnHeater: 'name',  columnHeaterValue: 'País'},
    { columnHeater: 'statesNumber', columnHeaterValue: 'Estados / Departamentos'}
  ];

  constructor( 
    private countryService: CountryService,
    private validatorService: ValidatorsService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(page: number = 1, filter = '') {
    this.validatorService.showLoading(true);
    this.countryService.getCountries(page, filter)
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
    .subscribe( countries => {
      this.countryService.getTotalCountries(filter)
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
        this.countries = countries;
        this.totalCountries = total;
        this.validatorService.showLoading(false);
      });
    });
  }

  onPageChange(paginate: Paginate) {
    this.loadCountries(paginate.page, paginate.filter);
  }

  gotoCreateCountry() {
    this.router.navigate(['country/add']);
  }

  gotoCountryDetails(id: number) {
    this.router.navigate(['country/details', id]);
  }

  gotoUpdateCountry(id: number) {
    this.router.navigate(['country/edit', id]);
  }

  deleteCountry(id: number) {
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
        this.countryService.deleteCountry(id)
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
          this.loadCountries();
        })
      } else {
        return;
      }
    });
  }

}
