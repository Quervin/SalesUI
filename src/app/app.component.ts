import { Component } from '@angular/core';

import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalesUI';

  get isLoading() {
    return this.validatorsService.isLoading;
  }

  constructor(
    private validatorsService: ValidatorsService
  ) {}

}
