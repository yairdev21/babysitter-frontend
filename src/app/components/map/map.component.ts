import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { workerInfo } from '../../models/worker-info.interface';
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
    // TODO: do I need it?
    zoomControl: false,
    clickableIcons: false,
    gestureHandling: 'greedy'
  };
  markers:MarkerWithInfo[] = [];
  mockMarkers: MarkerWithInfo[];

  constructor(
    private dialog: MatDialog,
    private serviceProviders: Workers
    ) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(x => {
      this.center = {
        lat: x.coords.latitude,
        lng: x.coords.longitude
      };
    });
    this.serviceProviders.getWorkers().subscribe(data => {
      this.mockMarkers = data
    });
    this.markers = this.mockMarkers;
  }
  
  openInfo(marker: MarkerWithInfo, info: workerInfo): void {
    // TODO: do I need it?
    //this.infoContent = info;
    //this.info.open(marker);
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: info
    })
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
       // TODO: handle confirm (call or whatsapp pressed)
      }
    });
  }

}
