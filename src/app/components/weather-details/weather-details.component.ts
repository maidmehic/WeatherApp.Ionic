import { Component, OnInit, Input } from '@angular/core';
import { Forecast } from 'src/app/models/forecast.model';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
})
export class WeatherDetailsComponent implements OnInit {

  @Input() forecast: Forecast;
  constructor() { }

  ngOnInit() {}

}
