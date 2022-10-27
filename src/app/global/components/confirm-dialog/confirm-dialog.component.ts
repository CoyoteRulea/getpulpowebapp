import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public confirmMessage: string) { }

  closeDialog() : void {
    this.confirmDialogRef.close(false)
  }

  confirmDialog() : void {
    this.confirmDialogRef.close(true)
  }

  ngOnInit(): void {
  }

}
