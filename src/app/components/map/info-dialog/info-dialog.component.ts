import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkerInfo } from '../../../models/worker-info.interface';

@Component({
  selector: 'bs-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoDialogComponent {

  get tel(): string {
    // TODO: do I need it? //const ilPhonePrefix: string =  '+972'
    return `tel:${this.info.phone}`;
  }

  get age(): number {
    // TODO: if I use angular material date picker I dont need to parse the date
    const dateOfBirth =  this.parseDate(this.info.dateOfBirth);
    const birthYear = dateOfBirth.getFullYear();
    const birthMonth = dateOfBirth.getMonth() === 0 ? 12 : dateOfBirth.getMonth();

    const presentYear = new Date().getFullYear();
    const presentMonth = new Date().getMonth() === 0 ? 12 : new Date().getMonth();
    const monthDifference = presentMonth - birthMonth;
    const halfYearDifference = monthDifference >= 6 ? .5 : monthDifference <= -6 ? -.5 : 0;

    return presentYear - birthYear + halfYearDifference;
  }

  get sendWhatsapp(): string {
    const defaultMessage =  'שלום, הגעתי אלייך דרך אפליקציית בייביסטר. פנויה הערב?';
    return `https://wa.me/${this.info.phone}/?text=${defaultMessage}`;
  }


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InfoDialogComponent>) {
      if (data) {
        this.info = data;
      } else {
        // TODO: error handling if no data
      }
  }

  info: WorkerInfo;

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  private parseDate(s): Date {
    const b = s.split(/\D/);
  // TODO: check if need to minus one the month or no
    return new Date(b[0], --b[1], b[2]);
  }

}
