import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { tap, catchError} from 'rxjs/operators';

import { WorkerInfo, WorkerForm } from '../models/worker-info.interface';
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
  };



  constructor(private http: HttpClient) { }
  apiUrl: string =  (isDevMode())
  ? '//localhost:3000/api/worker/'
  : '/api/worker/';

  getWorkers(): Observable<MarkerWithInfo[]> {
    return this.http.get<MarkerWithInfo[]>(this.apiUrl)
      .pipe(
        tap(result => {
          console.log('fetched workers', result);
        }),
        catchError(this.handleError)
      );
  }
  
// getUserById(id: number): Observable<ApiResponse> {
//   return this.http.get<ApiResponse>(this.baseUrl + id);
// }

  addWorker(workerFormData: WorkerForm): Observable<MarkerWithInfo> {
    const marker: MarkerWithInfo = this.BuildMarkerWithInfo(workerFormData);
    // return of(true);
    return this.http.post<MarkerWithInfo>(this.apiUrl, marker)
    .pipe(
      tap(result => {
        console.log('added marker', marker, result);
      }),
      catchError(this.handleError)
    );
  }

  private BuildMarkerWithInfo(workerInfo: WorkerForm): MarkerWithInfo {
    const info: WorkerInfo = { ...workerInfo, created: Date.now() };
    return {
      info,
      // TODO: declare all these properties to be reusable:
      label: {
        color: 'blue',
        text: `${info.firstName} ${info.lastName}`
      },
      title: 'פנויה הערב',
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    };
  }

  // updateUser(user: User): Observable<ApiResponse> {
  //   return this.http.put<ApiResponse>(this.baseUrl + user.id, user);
  // }

  // deleteUser(id: number): Observable<ApiResponse> {
  //   return this.http.delete<ApiResponse>(this.baseUrl + id);
  // }

  // TODO: make error handling in api service
  private handleError(error: HttpErrorResponse): Observable<never>{
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
