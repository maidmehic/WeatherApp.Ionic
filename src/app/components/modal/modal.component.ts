import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ForecastService } from 'src/app/services/forecast.service';
import { City } from 'src/app/models/city.model';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  search: string;
  cities: City[];
  page: number;
  constructor(private modalCtr: ModalController, private service: ForecastService) { }

  ngOnInit() {
    this.search = "";
    this.cities = [];
    this.page = 1;
    this.getCities();
  }

  async dismiss() {
    await this.modalCtr.dismiss();
  }

  searchChanged() {
    this.page = 1;
    this.cities = [];
    this.getCities();
  }

  getCities(event?) {
    this.service.getCities(this.search, this.page).subscribe(
      (res: City[]) => {
        if (event)
          event.target.complete();
        this.cities = this.cities.concat(res);
        console.log(this.cities.length);
      },
      (err) => {
        if (event)
          event.target.complete();
        console.log(err);
      }
    )
  }

  loadData($event) {
    this.page++;
    this.getCities($event);
  }
}
