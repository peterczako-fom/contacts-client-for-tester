import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ContactListDto} from "../models/contact-list-dto";
import {PageRequest} from "../shared/page-request";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ContactDto} from "../models/contact-dto";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  static readonly ContactListGetPath: string = 'http://localhost:8080/api/v1/contacts/list'

  list(pageRequest: PageRequest): Observable<ContactListDto> {
    const params = new HttpParams()
      .set('page', pageRequest.page)
    return this.http.get<ContactListDto>(ContactService.ContactListGetPath, {params: params});
  }

  static readonly CompanyOptionsGetPath: string = 'http://localhost:8080/api/v1/contacts/company-options'

  getCompanyOptions(): Observable<any> {
    return this.http.get<any>(ContactService.CompanyOptionsGetPath);
  }

  static readonly ContactCreatePostPath: string = 'http://localhost:8080/api/v1/contacts/create'

  create(contact: ContactDto) {
    return this.http.post(ContactService.ContactCreatePostPath, contact);
  }
}
