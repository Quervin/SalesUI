import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

import { City } from 'src/app/interfaces';

import { CityService } from '../../services/city.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './add-page.component.html',
  styles: [
  ]
})
export class AddPageComponent {
  public namePage: string = 'Crear Estado';
  
  public cityForm: FormGroup = this.fb.group({
    cuidad: [ '', [Validators.required, Validators.maxLength(100)] ]
  });

  public stateId: number = 0;

  public city: City = {
    id: 0,
    name: "",
    stateId: 0
  };

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private validatorService: ValidatorsService,
    private router: Router
  ) {
    if ( !this.router.url.includes('edit') ) {
      this.activatedRoute.params
      .subscribe(({ id }) => this.stateId = id);
      return;
    } 
    this.namePage = 'Editar Estado';
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.cityService.getCity( id ) ),
      catchError(({ error, status })  => {
        Swal.fire({
          icon: "error",
          title: 'Error',
          text: status != 0 ? error : "Ha ocurrido un error inesperado"
        });
        return of();
      })
    )
    .subscribe( state => {

      if ( !state ) {
       this.goBack();
      }

      this.city = state;
      this.stateId = this.city.stateId;

      this.cityForm.reset({
        cuidad: state.name
      });
    });
  }

  onSave(myForm: FormGroup) {

    this.city.name = myForm.value.cuidad;

    if ( this.city.id != 0 ) {
      this.validatorService.showLoading(true);
      this.cityService.updateCity( this.city )
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
    
    this.city.stateId = this.stateId;

    this.validatorService.showLoading(true);
    this.cityService.createCity(this.city)
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

  goBack() {
    this.router.navigate(['state/details', this.stateId]);
  }
}
