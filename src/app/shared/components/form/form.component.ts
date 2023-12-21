import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'shared-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent {

  @Input()
  public myForm?: FormGroup;

  @Input()
  public name: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public label: string = '';

  @Output()
  public onSave: EventEmitter<FormGroup> = new EventEmitter();

  @Output()
  public onGoBack: EventEmitter<any> = new EventEmitter();

  constructor(
    private validatorService: ValidatorsService,
  ) { }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.myForm!, field);
  }

  getFieldError(field: string) {
    return this.validatorService.getErrorMesage(this.myForm!, field);
  }

  emitSave() {
    if (this.myForm!.invalid) {
      this.myForm!.markAllAsTouched();
      return;
    }

    this.onSave.emit(this.myForm);
  }

  emitBack() {
    this.onGoBack.emit();
  }

}
