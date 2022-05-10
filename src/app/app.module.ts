import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ContactCreateDialogComponent } from './contacts/dialogs/contact-create-dialog/contact-create-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import { ConfirmDeleteDialogComponent } from './shared/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { ContactEditDialogComponent } from './contacts/dialogs/contact-edit-dialog/contact-edit-dialog.component';
import { ContactShowDialogComponent } from './contacts/dialogs/contact-show-dialog/contact-show-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactCreateDialogComponent,
    ConfirmDeleteDialogComponent,
    ContactEditDialogComponent,
    ContactShowDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
