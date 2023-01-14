import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {
  message: string;
  header: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, header: string }) {
    this.message = data.message;
    this.header = data.header;
  }
}
