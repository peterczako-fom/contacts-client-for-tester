import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContactService} from "../../../services/contact.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ContactDto} from "../../../models/contact-dto";
import {ErrorMessageService} from "../../../services/error-message.service";

@Component({
  selector: 'app-contact-edit-dialog',
  templateUrl: './contact-edit-dialog.component.html',
  styleUrls: ['./contact-edit-dialog.component.scss']
})
export class ContactEditDialogComponent implements OnInit {

  loading: boolean = true;
  form: FormGroup;
  companyOptions: {key: string, value: string}[] = [];
  errorMessages: any[] = [];

  constructor(
    private ref: MatDialogRef<ContactEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactService: ContactService,
    private errorMessageService: ErrorMessageService,
  ) {
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      companyId: new FormControl(),
      comment: new FormControl(),
      createdDate: new FormControl(),
      lastModifiedDate: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.contactService.get(this.data.id).subscribe({
      next: (contact) => {
        this.populateForm(contact);
        this.disableForm();
        this.loading = false;
      },
      error: (error) => console.log(error)
    });

    this.contactService.getCompanyOptions().subscribe(options => {
      this.companyOptions = Object.keys(options).map(k => {
        return {key: k.toString(), value: options[k]};
      });
    });
  }

  private populateForm(contact: ContactDto) {
    this.form.get('firstName')?.setValue(contact.firstName);
    this.form.get('lastName')?.setValue(contact.lastName);
    this.form.get('email')?.setValue(contact.email);
    this.form.get('phoneNumber')?.setValue(contact.phoneNumber);
    this.form.get('companyId')?.setValue(contact.companyId.toString());
    this.form.get('comment')?.setValue(contact.comment);
    this.form.get('createdDate')?.setValue(contact.createdDate);
    this.form.get('lastModifiedDate')?.setValue(contact.lastModifiedDate);
  }

  private disableForm() {
    this.form.get('createdDate')?.disable();
    this.form.get('lastModifiedDate')?.disable();
  }

  updateContact() {
    this.form.disable();
    this.contactService.update(this.data.id, this.form.value).subscribe({
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
