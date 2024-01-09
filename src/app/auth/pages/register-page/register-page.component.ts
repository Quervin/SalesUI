import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

import { City, Country, Register, State, UserType } from 'src/app/interfaces';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { CityService } from 'src/app/cities/services/city.service';
import { CountryService } from 'src/app/countries/services/country.service';
import { StateService } from 'src/app/states/services/state.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: []
})
export class RegisterPageComponent {

  public registerForm: FormGroup = this.fb.group({
    document: ['', [Validators.required, Validators.maxLength(20)]],
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    address: ['', [Validators.required, Validators.maxLength(200)]],
    phoneNumber: ['', [Validators.required]],
    city: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
  });

  public user: Register = {
    userName: '',
    firstName: '',
    lastName: '',
    document: '',
    address: '',
    cityId: '',
    phoneNumber: '',
    photo: '',
    passwordConfirm: '',
    email: '',
    password: '',
    userType: UserType.User
  }

  public imageBase64: string | null = null;

  public countries:Country[] = [];
  public states:State[] = [];
  public cities:City[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cityService: CityService,
    private countryService: CountryService,
    private stateService: StateService,
    private validatorService: ValidatorsService,
    private router: Router
  ) {
    this.loadCountries();
   }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.registerForm, field);
  }

  getFieldError(field: string) {
    return this.validatorService.getErrorMesage(this.registerForm, field);
  }

  keyPressNumbers(event: any) {
    return this.validatorService.isNumber(event);
  }

  loadCountries() {
    this.validatorService.showLoading(true);
    this.countryService.getComboCountries()
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
    ).subscribe( countries => {
      this.countries = countries;
      this.validatorService.showLoading(false);
    })
  }

  loadCities(stateId: number) {
    this.validatorService.showLoading(true);
    this.cities = [];
    this.cityService.getComboCities(stateId)
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
    ).subscribe( cities => {
      this.cities = cities;
      this.validatorService.showLoading(false);
    })
  }

  loadStates(countryId: number) {
    this.validatorService.showLoading(true);
    this.states = [];
    this.cities = [];
    this.stateService.getComboStates(countryId)
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
    ).subscribe( states => {
      this.states = states;
      this.validatorService.showLoading(false);
    })
  }

  countryChanged(event: any) {
    this.loadStates(event.target.value);
  }

  stateChanged(event: any) {
    this.loadCities(event.target.value);
  }

  photoChanged(event: any) {

    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.imageBase64 = base64;
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target?.result?.toString()!));
    return result;
  }
  
  register() {

    if ( this.registerForm.invalid ) {
      this.validatorService.markForm(this.registerForm);
      return;
    }

    const { document, firstName, lastName, address, phoneNumber, city, email, password, passwordConfirm } = this.registerForm.value;

    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.document = document;
    this.user.address = address;
    this.user.phoneNumber = phoneNumber;
    this.user.cityId = city;
    this.user.email = email;
    this.user.userName = email;
    this.user.password = password;
    this.user.passwordConfirm = passwordConfirm;

    if (this.imageBase64 != null) {
      this.user.photo = this.imageBase64;
    }

    this.validatorService.showLoading(true);
    this.authService.register(this.user)
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
