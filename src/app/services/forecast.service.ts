import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Forecast } from '../models/forecast.model';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private BASE_URL: string = "https://api.openweathermap.org/data/2.5/";
  private deleteCity$ = new Subject<any>();
  private addCity$ = new Subject<number>();
  deleteCity: Observable<any>;
  addCity: Observable<number>;

  constructor(private httpClient: HttpClient) {
    this.deleteCity = this.deleteCity$.asObservable();
    this.addCity = this.addCity$.asObservable();
  }

  getForecastByCityId(cityId: number): Observable<Forecast> {

    let url = this.BASE_URL + "weather";
    const params = new HttpParams()
      .set('id', cityId.toString())
      .set('appid', 'b4c8989fdd5a81b82dd63d94eff574d3')
      .set('units', 'metric');

    return this.httpClient.get<Forecast>(url, { params: params });
  }

  getCities(name: string, page: number): Observable<City[]> {

    let url = "https://weather-cities.p1714.app.fit.ba/api/values";
    let params;
    if (/\S/.test(name)) {
      params = new HttpParams()
        .set('name', name)
        .set('page', page.toString())
        .set('perPage', '100');
    } else {
      params = new HttpParams()
        .set('page', page.toString())
        .set('perPage', '100');
    }

    return this.httpClient.get<City[]>(url, { params: params });
  }

  onDeleteCity() {
    this.deleteCity$.next();
  }

  onAddCity(cityId: number) {
    this.addCity$.next(cityId);
  }
}
