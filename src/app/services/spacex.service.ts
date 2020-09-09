import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  endPointURL: string = "https://api.spaceXdata.com/v3/launches?limit=100";
  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    return this.http.get(this.endPointURL);
  }


  getDataOnFilter(currLaunch?: string, currLand?: string, currYear?: string): Observable<any> {

    return this.http.get(`${this.endPointURL}&launch_success=${currLaunch}&land_success=${currLand}&launch_year=${currYear}`);
  }

}
