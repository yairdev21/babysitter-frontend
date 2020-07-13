import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from "rxjs";
import { workerInfo, workerForm } from '../models/worker-info.interface';
import { MarkerWithInfo } from '../models/marker.interface';

@Injectable({
  providedIn: 'root'
})
export class Workers {
  // TODO: - delete mockmarker
  mockMarker = { 
    label: {
      color: 'blue',
      text: 'שרה איבגי'
    },
    title: 'פנויה הערב',
    info: {
      id: 1,
      firstName: 'שרה',
      lastName: 'איבגי',
      created: Date.now(),
      address: 'כרמל 6 לוד',
      position: {
        lat: 31.949350099999996,
        lng: 34.8875337
      },
      dateOfBirth: new Date(1986, 12, 4),
      phone: 525415858,
      ratePerHour: 20
    },
    options: {
      animation: google.maps.Animation.BOUNCE
    }
  }



  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/users/';
  //TODO: delete the mockMarker
  markers: MarkerWithInfo[] = [this.mockMarker];

  
  getWorkers() : Observable<MarkerWithInfo[]> {
    //return this.http.get<ApiResponse>(this.baseUrl);
    return of(this.markers);
  }
  
  // getUserById(id: number): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.baseUrl + id);
  // }

  addWorker(serviceProviderInfo: workerForm): Observable<boolean> {
    const info :workerInfo = {...serviceProviderInfo, created: Date.now()}
    //TODO: if I use angular material date picker I dont need to parse the date
    info.dateOfBirth = this.parseDate(info.dateOfBirth);
    const marker : MarkerWithInfo = { 
      info,
      //TODO: declare all these properties to be reusable:
      label: {
        color: 'blue',
        text: info.firstName + info.lastName
      },      
      title: 'פנויה הערב',
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    }
    this.markers.push(marker)
    return of(true);
    //return this.http.post<boolean>(this.baseUrl, user);


  }

  // updateUser(user: User): Observable<ApiResponse> {
  //   return this.http.put<ApiResponse>(this.baseUrl + user.id, user);
  // }

  // deleteUser(id: number): Observable<ApiResponse> {
  //   return this.http.delete<ApiResponse>(this.baseUrl + id);
  // }

  private parseDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
  }

}
