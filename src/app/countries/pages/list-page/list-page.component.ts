import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

import { Country, Table } from 'src/app/interfaces';

import { CountryService } from '../../services/country.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public countries: Country[] = [];
  public columns: Table[] = [
    { columnHeater: 'name',  columnHeaterValue: 'País'},
    { columnHeater: 'statesNumber', columnHeaterValue: 'Estados / Departamentos'}
  ];

  constructor( 
    private countryService: CountryService,
    private validatorService: ValidatorsService,
    private router:Router
    ) {
      this.loadCountries();
    }

  ngOnInit(): void {
  }

  loadCountries() {
    this.countryService.getCountries()
    .pipe(
      catchError(({ error, status })  => {
        Swal.fire({
          icon: "error",
          title: 'Error',
          text: status != 0 ? error : "Ha ocurrido un error inesperado"
        });
        return of();
      })
    )
    .subscribe( country => {
      this.countries = country;
      this.validatorService.showLoading(false);
    });
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
