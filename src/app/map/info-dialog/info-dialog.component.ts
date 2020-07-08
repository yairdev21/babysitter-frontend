import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Info } from './info.interface';

@Component({
  selector: 'bs-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {


public get tel() : string {
  //const ilPhonePrefix: string =  '+972'
  return `tel:0${this.info.phone}`
}


public get sendWhatsapp() : string {
  const defaultMessage: string =  'שלום, הגעתי אלייך דרך אפליקציית בייביסטר. פנויה הערב?'
  return `https://wa.me/0${this.info.phone}/?text=${defaultMessage}`
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
