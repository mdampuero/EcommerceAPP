import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/models/product";
import { AlertController } from "@ionic/angular";
import { CartService } from "src/app/services/cart/cart.service";
import { Events } from "src/app/services/events.service";

@Component({
  selector: "app-btn-rem-cart",
  templateUrl: "./btn-rem-cart.component.html",
  styleUrls: ["./btn-rem-cart.component.scss"],
})
export class BtnRemCartComponent implements OnInit {
  @Input() item: Product;
  @Input() size = "large";
  constructor(
    public alertController: AlertController,
    public cartService: CartService,
    public events: Events
  ) {}

  ngOnInit() {}

  async removeCart() {
    const alert = await this.alertController.create({
      header: "Atención",
      message:
        "¿Está seguro que desea quitar este producto del carrito de compras?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Aceptar",
          handler: () => {
            this.cartService.delete(this.item);
            this.events.publish('cart:update', {
              user: "Muestra",
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
