import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ContactService} from "../../../services/contact.service";
import {ContactDto} from "../../../models/contact-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {ContactDetailsDto} from "../../../models/contact-details-dto";

@Component({
  selector: 'app-contact-show-dialog',
  templateUrl: './contact-show-dialog.component.html',
  styleUrls: ['./contact-show-dialog.component.scss']
})
export class ContactShowDialogComponent implements OnInit {

  loading: boolean = true;
  contact: ContactDto | undefined;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactService: ContactService,
  ) {
    this.form = ContactShowDialogComponent.initForm()
  }

  ngOnInit(): void {
    this.contactService.getDetails(this.data.id).subscribe({
      next: (contact) => {
        this.populateForm(contact);
        this.form.disable();
        this.loading = false;
      },
      error: (error) => console.log(error)
    });
  }

  private static initForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(null, []),
      lastName: new FormControl(null, []),
      companyName: new FormControl(null, []),
      email: new FormControl(null, []),
      phoneNumber: new FormControl(null, []),
      comment: new FormControl(null, []),
      createdDate: new FormControl(null, []),
      lastModifiedDate: new FormControl(null, []),
    });
  }

  private populateForm(contact: ContactDetailsDto) {
    this.form.get('firstName')?.setValue(contact.firstName);
    this.form.get('lastName')?.setValue(contact.lastName);
    this.form.get('companyName')?.setValue(contact.companyName);
    this.form.get('email')?.setValue(contact.email);
    this.form.get('phoneNumber')?.setValue(contact.phoneNumber);
    this.form.get('comment')?.setValue(contact.comment);
    this.form.get('createdDate')?.setValue(contact.createdDate);
    this.form.get('lastModifiedDate')?.setValue(contact.lastModifiedDate);
  }
}
