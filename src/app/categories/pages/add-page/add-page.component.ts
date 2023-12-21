import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

import { Category } from 'src/app/interfaces';

import { CategoryService } from '../../services/category.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './add-page.component.html',
  styles: [
  ]
})
export class AddPageComponent {

  public namePage: string = 'Crear Categoria';

  public categoryForm: FormGroup = this.fb.group({
    categoria: ['', [Validators.required, Validators.maxLength(100)]]
  });

  public category: Category = {
    id: 0,
    name: ""
  }

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private validatorService: ValidatorsService,
    private router: Router
  ) {
    if (!this.router.url.includes('edit')) return;
    this.namePage = 'Editar Categoria';
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.categoryService.getCategory(id)),
        catchError(({ error, status }) => {
          Swal.fire({
            icon: "error",
            title: 'Error',
            text: status != 0 ? error : "Ha ocurrido un error inesperado"
          });
          return of();
        })
      )
      .subscribe(category => {

        if (!category) {
          this.goBack();
        }

        this.category = category;

        this.categoryForm.reset({
          categoria: category.name
        });
      });
  }

  onSave(myForm: FormGroup) {

    this.category.name = myForm.value.categoria;

    if (this.category.id != 0) {
      this.validatorService.showLoading(true);
      this.categoryService.updateCategory(this.category)
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
    this.categoryService.createCategory(this.category)
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
    this.router.navigate(['category/list']);
  }
}
