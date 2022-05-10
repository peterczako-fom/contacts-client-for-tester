import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {PageRequest} from "../../shared/page-request";
import {MatPaginator} from "@angular/material/paginator";
import {ContactListDto} from "../../models/contact-list-dto";
import {MatDialog} from "@angular/material/dialog";
import {ContactCreateDialogComponent} from "../dialogs/contact-create-dialog/contact-create-dialog.component";
import {ConfirmDeleteDialogComponent} from "../../shared/dialogs/confirm-delete-dialog/confirm-delete-dialog.component";
import {ContactListItemDto} from "../../models/contact-list-item-dto";
import {ContactEditDialogComponent} from "../dialogs/contact-edit-dialog/contact-edit-dialog.component";
import {ContactShowDialogComponent} from "../dialogs/contact-show-dialog/contact-show-dialog.component";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, AfterViewInit {

  contactDataSource!: ContactListDto;
  pageRequest: PageRequest = {
    page: 0
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ["fullName","companyName","email","phoneNumber","actions"];
  loading: boolean = true;

  constructor(
    private contactService: ContactService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  ngAfterViewInit(): void {
    this.paginator?.page.asObservable().subscribe(
      (data) => {
        this.pageRequest.page = data.pageIndex;
        this.loadContacts();
    });
  }

  loadContacts() {
    this.loading = true;
    this.contactService.list(this.pageRequest).subscribe({
      next: (data) => {
        this.contactDataSource = data;
        this.pageRequest.page = data.page;
        this.loading = false;

      },
      error: (error) => console.log('Contacts listing:', error)
    });
  }

  createContact() {
    const ref = this.dialog.open(ContactCreateDialogComponent, {minWidth: '500px'});
    ref.afterClosed().subscribe((created) => {
      if(created) {
        this.loadContacts();
      }
    });
  }

  editContact(item: ContactListItemDto) {
    const ref = this.dialog.open(ContactEditDialogComponent,
      {
        minWidth: '500px',
        data: {
          id: item.id
        }
      });
    ref.afterClosed().subscribe((edited) => {
      if(edited) {
        this.loadContacts();
      }
    });
  }

  viewContact(item: ContactListItemDto) {
    this.dialog.open(ContactShowDialogComponent,
      {
        minWidth: '500px',
        data: {
          id: item.id
        }
      });
  }

  deleteContact(contact: ContactListItemDto) {
    const ref = this.dialog.open(ConfirmDeleteDialogComponent, {
      minWidth: '500px',
      data: {item: contact}
    });
    ref.afterClosed().subscribe((confirm) => {
      if(confirm) {
        console.log('delete');
      }
    });
  }
}
