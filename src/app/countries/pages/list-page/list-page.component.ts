import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/country';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public countries: Country[] = [];
  public columns: string[] = ['actions', 'name'];

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

  gotoUpdateCountry(id: number) {
    this.router.navigate(['country/edit', id]);
  }

  delete(id: number) {
    Swal.fire<Boolean>({
      icon: 'question',
      title: 'Confirmación',
      text: "¿Realmente deseas eliominar el registro?",
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
    })
  }

}
