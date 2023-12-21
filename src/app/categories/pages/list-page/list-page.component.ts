import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

import { Category, Paginate, Table } from 'src/app/interfaces';

import { CategoryService } from '../../services/category.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public categories: Category[] = [];
  public totalCategories: number = 0;
  public columns: Table[] = [
    { columnHeater: 'name', columnHeaterValue: 'Categoria' }
  ];

  constructor(
    private categoryService: CategoryService,
    private validatorService: ValidatorsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(page: number = 1, filter = '') {
    this.validatorService.showLoading(true);
    this.categoryService.getCategories(page, filter)
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
      .subscribe(categories => {
        this.categoryService.getTotalCategories(filter)
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
            this.categories = categories;
            this.totalCategories = total;
            this.validatorService.showLoading(false);
          });
      });
  }

  onPageChange(paginate: Paginate) {
    this.loadCategories(paginate.page, paginate.filter);
  }

  gotoCreateCategory() {
    this.router.navigate(['/category/add']);
  }

  gotoUpdateCategory(id: number) {
    this.router.navigate(['/category/edit', id]);
  }

  deleteCategory(id: number) {
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
        this.categoryService.deleteCategory(id)
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
            this.loadCategories();
          })
      } else {
        return;
      }
    });
  }
}
