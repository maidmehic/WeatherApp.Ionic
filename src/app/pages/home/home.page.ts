import { Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { Forecast } from 'src/app/models/forecast.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  forecast: Forecast;
  lastUpdateDate: string;
  constructor(private forecastService: ForecastService, private datePipe: DatePipe) { }

  ngOnInit() {
    console.log('USLO U ONINIT!!!!!!!!');
    this.lastUpdateDate="N/A";
    this.forecastService.getForecastByCityId(3191281).subscribe(
      (res: Forecast) => {
        console.log('DOBILO PODATKET!!!!!!!!');

        this.lastUpdateDate=this.datePipe.transform(Date.now(), "d. E, h:mm a")
        this.forecast = res;
        console.log(this.forecast);
      },
      (err) => {
        console.log('NIJE DOBILO PODATKET!!!!!!!!');

        console.log(JSON.stringify(err));
      }
    )
  }

}
