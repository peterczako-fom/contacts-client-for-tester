import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {PageRequest} from "../../shared/page-request";
import {MatPaginator} from "@angular/material/paginator";
import {ContactListDto} from "../../models/contact-list-dto";
import {MatDialog} from "@angular/material/dialog";
import {ContactCreateDialogComponent} from "../dialogs/contact-create-dialog/contact-create-dialog.component";

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
    })
  }
}
