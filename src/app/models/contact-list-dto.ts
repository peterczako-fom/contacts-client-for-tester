import {ContactListItemDto} from "./contact-list-item-dto";

export interface ContactListDto {
  contacts: ContactListItemDto[];
  page: number;
  pageSize: number;
  totalElementNumber: number;
}
