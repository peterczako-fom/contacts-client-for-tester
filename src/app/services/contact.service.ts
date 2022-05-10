import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ContactListDto} from "../models/contact-list-dto";
import {PageRequest} from "../shared/page-request";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ContactDto} from "../models/contact-dto";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  static readonly ContactBasePath: string = `${environment.baseUrl}/v1/contacts`;

  constructor(
    private http: HttpClient
  ) { }

  list(pageRequest: PageRequest): Observable<ContactListDto> {
    const params = new HttpParams()
      .set('page', pageRequest.page)
    return this.http.get<ContactListDto>(ContactService.ContactBasePath, {params: params});
  }

  create(contact: ContactDto) {
    return this.http.post(ContactService.ContactBasePath, contact);
  }

  get(id: number): Observable<ContactDto> {
    const url = `${ContactService.ContactBasePath}/${id}`
    return this.http.get<ContactDto>(url);
  }

  update(id: number, contact: ContactDto) {
    const url = `${ContactService.ContactBasePath}/${id}`;
    return this.http.put(url, contact)
  }

  delete(id: number) {
    const url = `${ContactService.ContactBasePath}/${id}`;
    return this.http.delete(url)
  }

  getCompanyOptions(): Observable<any> {
    const url = `${ContactService.ContactBasePath}/company-options`
    return this.http.get<any>(url);
  }
}
