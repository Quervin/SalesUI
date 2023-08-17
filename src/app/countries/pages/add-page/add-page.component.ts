import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../../interfaces/country';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { catchError, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styles: [
  ]
})
export class AddPageComponent {

  public namePage: string = 'Crear País';
  
  public countryForm: FormGroup = this.fb.group({
    pais: [ '', [Validators.required, Validators.maxLength(100)] ]
  });

  public country: Country = {
    id: 0,
    name: ""
  };

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private activatedRoute: ActivatedRoute,
    private validatorService: ValidatorsService,
    private router: Router
  ) {
    if ( !this.router.url.includes('edit') ) return;
    this.namePage = 'Editar País';
    this.validatorService.showLoading(true);
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.countryService.getCountry( id ) ),
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
    .subscribe( country => {

      if ( !country ) {
       this.goBack();
      }

      this.country = country;

      this.countryForm.reset({
        pais: country.name
      });

      this.validatorService.showLoading(false);
    });
  }

  onSave() {
    if ( this.countryForm.invalid ) {
      this.countryForm.markAllAsTouched();
      return;
    }

    this.country.name = this.countryForm.value.pais;

    if ( this.country.id != 0 ) {
      this.validatorService.showLoading(true);
      this.countryService.updateCountry( this.country )
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
      ).subscribe(() => {
        this.validatorService.showLoading(false);
        this.goBack();
      });
      return;
    }

    this.validatorService.showLoading(true);
    this.countryService.createCountry(this.country)
    .pipe(
      catchError( ({ error, status }) => {
        Swal.fire({
          icon: "error",
          title: 'Error',
          text: status != 0 ? error : "Ha ocurrido un error inesperado"
        });
        this.validatorService.showLoading(false);
        return of();
      })
    ).subscribe(() => {
      this.validatorService.showLoading(false);
      this.goBack();
    });

  }

  isValidField( field: string ) {
    return this.validatorService.isValidField( this.countryForm, field );
  }

  getFieldError( field: string ) {
    return this.validatorService.getErrorMesage( this.countryForm, field );
  }


  goBack() {
    this.router.navigate(['country/list']);
  }

}
