import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forecast } from '../models/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  url: string = "https://api.openweathermap.org/data/2.5/";

  constructor(private httpClient: HttpClient) { }

  getForecastByCityId(cityId: number): Observable<Forecast> {

    const params = new HttpParams()
      .set('id', cityId.toString())
      .set('appid', 'b4c8989fdd5a81b82dd63d94eff574d3')
      .set('units', 'metric');

    this.url += "weather";

    return this.httpClient.get<Forecast>(this.url, { params: params });
  }
}
