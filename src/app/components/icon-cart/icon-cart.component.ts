import { Component, OnInit } from "@angular/core";
import { CartPage } from "../../modals/cart/cart.page";
import { ModalController } from "@ionic/angular";
import { CartService } from "src/app/services/cart/cart.service";
import { Events } from "src/app/services/events.service";

@Component({
  selector: "app-icon-cart",
  templateUrl: "./icon-cart.component.html",
  styleUrls: ["./icon-cart.component.scss"],
})
export class IconCartComponent implements OnInit {
  amount = 0;
  constructor(
    public modalController: ModalController,
    public cartService: CartService,
    public events: Events
  ) {
    this.amount = this.cartService.list.length;
    this.events.subscribe('cart:update', (data: any) => {
      this.amount = this.cartService.list.length;
    });
  }

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: CartPage,
    });
    return await modal.present();
  }
}
