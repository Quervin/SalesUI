import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  private loading: boolean = false;

  get isLoading() {
    return this.loading;
  }

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getErrorMesage(form: FormGroup, field: string) {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `El campo ${field} es obligatortio.`;
        case 'minlength':
          return `El campo ${field} no puede tener menos de ${errors['minlength'].requiredLength} caractéres`;
        case 'maxlength':
          return `El campo ${field} no puede tener más de ${errors['maxlength'].requiredLength} caractéres`;
        case 'pattern':
          return `El campo ${field} no es un correo valido`;
      }
    }

    return null;
  }

  showLoading(changeLoading: boolean) {
    this.loading = changeLoading;
  }

}
