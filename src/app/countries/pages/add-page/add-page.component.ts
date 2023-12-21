import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

import { Country } from 'src/app/interfaces';

import { CountryService } from '../../services/country.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './add-page.component.html',
  styles: [
  ]
})
export class AddPageComponent {

  public namePage: string = 'Crear País';

  public countryForm: FormGroup = this.fb.group({
    pais: ['', [Validators.required, Validators.maxLength(100)]]
  });

  public country: Country = {
    id: 0,
    name: "",
    statesNumber: 0
  };

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private activatedRoute: ActivatedRoute,
    private validatorService: ValidatorsService,
    private router: Router
  ) {
    if (!this.router.url.includes('edit')) return;
    this.namePage = 'Editar País';
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countryService.getCountry(id)),
        catchError(({ error, status }) => {
          Swal.fire({
            icon: "error",
            title: 'Error',
            text: status != 0 ? error : "Ha ocurrido un error inesperado"
          });
          return of();
        })
      )
      .subscribe(country => {

        if (!country) {
          this.goBack();
        }

        this.country = country;

        this.countryForm.reset({
          pais: country.name
        });
      });
  }

  onSave(myForm: FormGroup) {

    this.country.name = myForm.value.pais;

    if (this.country.id != 0) {
      this.validatorService.showLoading(true);
      this.countryService.updateCountry(this.country)
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
        ).subscribe(() => {
          this.validatorService.showLoading(false);
          this.goBack();
        });
      return;
    }

    this.validatorService.showLoading(true);
    this.countryService.createCountry(this.country)
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
      ).subscribe(() => {
        this.validatorService.showLoading(false);
        this.goBack();
      });

  }

  goBack() {
    this.router.navigate(['country/list']);
  }

}
