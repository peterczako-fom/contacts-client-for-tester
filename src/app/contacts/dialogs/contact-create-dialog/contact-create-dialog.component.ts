import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../../../services/contact.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ErrorMessageService} from "../../../services/error-message.service";

@Component({
  selector: 'app-contact-create-dialog',
  templateUrl: './contact-create-dialog.component.html',
  styleUrls: ['./contact-create-dialog.component.scss']
})
export class ContactCreateDialogComponent implements OnInit {
  form: FormGroup;

  companyOptions: {key: string, value: string}[] = [];
  errorMessages: any[] = [];

  constructor(
    private ref: MatDialogRef<ContactCreateDialogComponent>,
    private contactService: ContactService,
    private errorMessageService: ErrorMessageService,
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('Jack', [Validators.required]),
      lastName: new FormControl('Doe', [Validators.required]),
      companyId: new FormControl('1', [Validators.required]),
      email: new FormControl('test@zzz.com', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('+36201234567', [Validators.pattern('^\\+36\\d{9}$')]),
      comment: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.contactService.getCompanyOptions().subscribe(options => {
      this.companyOptions = Object.keys(options).map(k => {
        return {key: k.toString(), value: options[k]};
      });
    });
  }

  createContact() {
    this.form.disable();
    this.contactService.create(this.form.value).subscribe({
      next: () => this.ref.close(true),
      error: (error) => {
        error.error
        this.form.enable();
        this.form.markAllAsTouched();
        this.errorMessageService.setErrorsInForm(this.form, error.error);
        this.setErrorsNotForForm(error.error);
      },
    });
  }

  getError(field: string): string {
      return this.errorMessageService.getError(this.form.get(field));
  }

  hasError(field: string): boolean {
    return this.form.get(field)?.errors != null;
  }

  private setErrorsNotForForm(errors: any[]) {
    const formControlNames = Object.keys(this.form.getRawValue());
    this.errorMessages = errors.filter(error => !formControlNames.includes(error.field));
  }
}
