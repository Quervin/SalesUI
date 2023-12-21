import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

import { User } from 'src/app/interfaces';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public user: User = {
    email: '',
    password: ''
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validatorService: ValidatorsService,
    private router: Router
  ) { }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.loginForm, field);
  }

  getFieldError(field: string) {
    return this.validatorService.getErrorMesage(this.loginForm, field);
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.user.email = email;
    this.user.password = password;

    this.validatorService.showLoading(true);
    this.authService.login(this.user)
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
      ).subscribe(tokenResult => {
        const { token, expiration } = tokenResult;
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration);
        this.validatorService.showLoading(false);
        this.router.navigate(['/country/list']);
      })
  }
}
