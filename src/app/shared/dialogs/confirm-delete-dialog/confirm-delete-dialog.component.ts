import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {

  entity: any;
  id: number;
  deleteMethod: Function;

  constructor(
    private ref: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.entity = data.entity;
    this.id = data.id;
    this.deleteMethod = data.deleteMethod;
  }

  ngOnInit(): void {
  }

  deleteContact() {
    this.deleteMethod(this.id).subscribe({
      next: () => this.ref.close(true)
    });
  }
}
