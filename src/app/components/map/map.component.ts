import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { WorkerInfo } from '../../models/worker-info.interface';
import { MarkerWithInfo } from '../../models/marker.interface';
import { Workers } from 'src/app/services/workers.service';

@Component({
  selector: 'bs-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    // gestureHandling: 'greedy',
    disableDefaultUI: true, // a way to quickly hide all controls
  };
  markers: MarkerWithInfo[] = [];
  mockMarkers: MarkerWithInfo[];

  constructor(
    private dialog: MatDialog,
    private workers: Workers
    ) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(x => {
      this.center = {
        lat: x.coords.latitude,
        lng: x.coords.longitude
      };
    });
    this.workers.getWorkers().subscribe(data => {
      this.markers.push(...data);
    });
  }

  panToCenter(): void {
    this.map.panTo(this.center);
  }

  openInfo(marker: MarkerWithInfo, info: WorkerInfo): void {
    // TODO: do I need it?
    // this.infoContent = info;
    // this.info.open(marker);
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: info
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
       // TODO: handle confirm (call or whatsapp pressed)
      }
    });
  }

}
