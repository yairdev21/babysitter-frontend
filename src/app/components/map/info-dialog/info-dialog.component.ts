import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { workerInfo } from '../../../models/worker-info.interface';

@Component({
  selector: 'bs-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoDialogComponent {

  get tel() : string {
    // TODO: do I need it? //const ilPhonePrefix: string =  '+972'
    return `tel:0${this.info.phone}`
  }

  get age() : number {
    const birthYear = this.info.dateOfBirth.getFullYear();
    const presentYear = new Date().getFullYear();

    const birthMonth = this.info.dateOfBirth.getMonth() === 0 ? 12 : this.info.dateOfBirth.getMonth();
    const presentMonth = new Date().getMonth() === 0 ? 12 : new Date().getMonth();
    const monthDifference = presentMonth - birthMonth;
    const halfYearDifference  = monthDifference >= 6 ? .5: monthDifference <= -6 ? -.5 : 0;

    return presentYear - birthYear + halfYearDifference;
  }

  get sendWhatsapp() : string {
    const defaultMessage: string =  'שלום, הגעתי אלייך דרך אפליקציית בייביסטר. פנויה הערב?'
    return `https://wa.me/0${this.info.phone}/?text=${defaultMessage}`
  }
  
  info: workerInfo;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InfoDialogComponent>) {
      if (data) {
        this.info = data;
      } else {
        // TODO: error handling if no data
      }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
