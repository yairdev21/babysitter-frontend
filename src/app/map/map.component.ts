import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { Info } from './info-dialog/info.interface';
import { MarkerWithInfo } from './marker.interface';

@Component({
  selector: 'bs-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  zoom = 15;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    //zoomControl: true,
    clickableIcons: false
  };
  markers:MarkerWithInfo[] = [];
  mockMarkers: MarkerWithInfo[];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(x => {
      this.center = {
        lat: x.coords.latitude,
        lng: x.coords.longitude
      };
    });
    this.markers.push(this.addMockMarker());
  }
  
  openInfo(marker: MarkerWithInfo, info: Info) {
    //this.infoContent = info;
    //this.info.open(marker);
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: info
    })
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
      }
    });
  }

  
  addMockMarker(): MarkerWithInfo {
    return { 
      position: {
        lat: 31.949350099999996,
        lng: 34.8875337
      },
      label: {
        color: 'blue',
        text: 'שרה איבגי'
      },
      title: 'פנויה הערב',
      info: {
        id: 1,
        name: 'שרה איבגי',
        created: Date.now(),
        phone: 525415858,
        ratePerHour: 20
      },
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    }
  }

}
