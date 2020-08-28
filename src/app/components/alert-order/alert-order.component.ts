import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { ApiService } from "../../services/api/api.service";
import { Events } from "src/app/services/events.service";

@Component({
  selector: 'app-alert-order',
  templateUrl: './alert-order.component.html',
  styleUrls: ['./alert-order.component.scss'],
})
export class AlertOrderComponent implements OnInit {
  orderBy = "name#ASC";
  @Input() page = '';
  constructor( private alertController: AlertController, private apiService: ApiService, public events: Events) { }

  ngOnInit() {}
  async orderAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Ordenar",
      inputs: [
        {
          name: "order",
          type: "radio",
          label: "Nombre",
          value: "name#ASC",
          checked: this.orderBy == "name#ASC" ? true : false,
        },
        {
          name: "order",
          type: "radio",
          label: "Menor precio",
          value: "price#ASC",
          checked: this.orderBy == "price#ASC" ? true : false,
        },
        {
          name: "order",
          type: "radio",
          label: "Mayor precio",
          value: "price#DESC",
          checked: this.orderBy == "price#DESC" ? true : false,
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Aceptar",
          handler: (data) => {
            this.orderBy = data;
            switch (this.orderBy) {
              case 'name#ASC':
                this.apiService.sort='name';
                this.apiService.direction='ASC';
                break;
              case 'price#ASC':
                this.apiService.sort='price';
                this.apiService.direction='ASC';
                break;
              case 'price#DESC':
                this.apiService.sort='price';
                this.apiService.direction='DESC';
                break;
            }
            this.events.publish(this.page+':research', {
              user: "Muestra",
            });
            console.log("Confirm Ok");
          },
        },
      ],
    });

    await alert.present();
  }
}
