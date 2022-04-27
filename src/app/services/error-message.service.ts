import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }

  getError(control: AbstractControl | null): string {
    if(!control) {
      return '';
    }
    if(control.hasError('required')) {
      return 'Field is required!';
    }
    if(control.hasError('pattern')) {
      return 'Format not appropriate!';
    }
    if(control.hasError('email')) {
      return 'Email format not appropriate!'
    }

    if(control.hasError('bannedDomain')) {
      return 'Email use banned domain!';
    }

    if(control.errors) {
      console.log('unknown error:', Object.keys(control.errors).shift());
      return 'Unknown error!';
    }
    return '';
  }

  setErrorsInForm(form: FormGroup, errors: any[]) {
    if(!form || !errors || errors.length == 0) {
      return;
    }

    Object.keys(form.getRawValue()).forEach(key => {
      const error = errors.find(error => error.field == key);
      if(error) {
        form.get(key)?.setErrors({[error.errorMessage]: true});
      }
    });
  }
}
