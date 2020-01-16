import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Forecast } from '../models/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private BASE_URL: string = "https://api.openweathermap.org/data/2.5/";
  private deleteCity$ = new Subject<any>();
  deleteCity: Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.deleteCity = this.deleteCity$.asObservable();
  }

  getForecastByCityId(cityId: number): Observable<Forecast> {

    let url = this.BASE_URL + "weather";
    const params = new HttpParams()
      .set('id', cityId.toString())
      .set('appid', 'b4c8989fdd5a81b82dd63d94eff574d3')
      .set('units', 'metric');

    return this.httpClient.get<Forecast>(url, { params: params });
  }

  onDeleteCity() {
    this.deleteCity$.next();
  }
}
