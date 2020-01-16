import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  search: string;
  cities = null;
  constructor(private modalCtr: ModalController) { }

  ngOnInit() {
    this.search = "";
    console.log(this.cities);
  }

  async dismiss() {
    await this.modalCtr.dismiss();
  }
}
