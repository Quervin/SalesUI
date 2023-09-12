import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

import { State } from 'src/app/interfaces';

import { StateService } from '../../services/state.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './add-page.component.html',
  styles: [
  ]
})
export class AddPageComponent {

  public namePage: string = 'Crear Estado';
  
  public stateForm: FormGroup = this.fb.group({
    estado: [ '', [Validators.required, Validators.maxLength(100)] ]
  });

  public countryId: number = 0;

  public state: State = {
    id: 0,
    name: "",
    countryId: 0
  };

  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private activatedRoute: ActivatedRoute,
    private validatorService: ValidatorsService,
    private router: Router
  ) {
    if ( !this.router.url.includes('edit') ) {
      this.activatedRoute.params
      .subscribe(({ id }) => this.countryId = id);
      return;
    } 
    this.namePage = 'Editar Estado';
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.stateService.getState( id ) ),
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

      this.state = state;
      this.countryId = this.state.countryId;

      this.stateForm.reset({
        estado: state.name
      });
    });
  }

  onSave(myForm: FormGroup) {

    this.state.name = myForm.value.estado;

    if ( this.state.id != 0 ) {
      this.validatorService.showLoading(true);
      this.stateService.updateState( this.state )
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
    
    this.state.countryId = this.countryId;

    this.validatorService.showLoading(true);
    this.stateService.createState(this.state)
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
    this.router.navigate(['country/details', this.countryId]);
  }
}
