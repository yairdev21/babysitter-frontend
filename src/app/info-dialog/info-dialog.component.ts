import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Info } from '../map/interfaces/marker.interface';

@Component({
  selector: 'bs-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {


public get tel() : string {
  return 'tel:+972' + this.info.phone;
}


public get sendWhatsapp() : string {
  return `https://wa.me/${this.info.phone}/?text=שלום, את פנויה הערב לבייביסיטר?`
}



  info: Info;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InfoDialogComponent>) {
      if (data) {
        this.info = data;
      }
    //TODO: error handling
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
