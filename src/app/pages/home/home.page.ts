import { Component, OnInit, ViewChild } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { Forecast } from 'src/app/models/forecast.model';
import { DatePipe } from '@angular/common';
import { IonSlides, PopoverController, AlertController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonSlides, { static: false }) slider: IonSlides;
  cityIds: number[];
  forecast: Forecast[] = [];
  lastUpdateDate: string;

  activeSlideCityName: string;
  counter: number;

  constructor(
    private forecastService: ForecastService,
    private datePipe: DatePipe,
    private popoverController: PopoverController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.counter = 0;
    this.cityIds = [3191281, 5809844, 3189146, 2950158, 3117732, 787595];
    this.activeSlideCityName = "N/A";
    this.lastUpdateDate = "N/A";

    this.forecastService.deleteCity.subscribe(
      () => {
        this.deleteCityFromSlides();
      }
    );

    this.getForecast(this.cityIds[this.counter]);
  }

  getForecast(cityId: number) {
    this.forecastService.getForecastByCityId(cityId).subscribe(
      (res: Forecast) => {
        this.forecast = this.forecast.concat(res);
        if (++this.counter < this.cityIds.length)
          this.getForecast(this.cityIds[this.counter]);
        else {
          this.lastUpdateDate = this.datePipe.transform(Date.now(), "d. E, h:mm a")
          this.changeToolbarTitle();
          console.log(this.forecast);
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

  async deleteCityFromSlides() {
    this.presentAlert(this.activeSlideCityName);
  }

  async changeToolbarTitle() {
    let index = await this.getActiveSlidesIndex();
    this.activeSlideCityName = this.forecast[index].name;
  }

  async getActiveSlidesIndex() {
    return await this.slider.getActiveIndex();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev
    });
    return await popover.present();
  }

  async presentAlert(cityName: string) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Are you sure you want to delete ' + cityName + " from active cities?",
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            console.log("deleting city on position " + await this.getActiveSlidesIndex());
          }
        },
        {
          text: 'Cancel',
          role: "cancel"
        }
      ]
    });

    return await alert.present();
  }
}
