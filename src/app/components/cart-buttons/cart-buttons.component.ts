import { Component, OnInit, Input } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { CartService } from "src/app/services/cart/cart.service";
import { Events } from "src/app/services/events.service";

@Component({
  selector: "app-cart-buttons",
  templateUrl: "./cart-buttons.component.html",
  styleUrls: ["./cart-buttons.component.scss"],
})
export class CartButtonsComponent implements OnInit {
  @Input() item: any;
  public itemCart: any;
  public tmpAmount = 0;
  constructor(
    public cartService: CartService,
    public toastCtrl: ToastController,
    public events: Events
  ) {}

  ngOnInit() {
    this.itemCart = this.cartService.list.find(
      (listData) => listData.code === this.item.code
    );
    if (this.itemCart) {
      this.item.amount = this.itemCart.amount;
    }
  }
  onBlurMethod() {
    if (this.item.amount % this.item.unit != 0) {
      this.errorToast(this.item.unit);
      this.item.amount = this.tmpAmount;
      return;
    }
    this.item.subtotal = this.item.cost * this.item.amount;
    this.item.subtotalVat = this.item.subtotal * this.item.vat;
    if (this.itemCart) {
      this.cartService.update(this.item);
    } else {
      this.cartService.add(this.item);
    }
    // if (this.item.amount == this.item.unit) {
    //   this.cartService.add(this.item);
    // } else {
    //   this.cartService.update(this.item);
    // }
  }
  onFocusMethod() {
    this.tmpAmount = this.item.amount;
  }

  add() {
    this.item.amount += parseInt(this.item.unit);
    this.tmpAmount = this.item.amount;
    this.item.subtotal = this.item.cost * this.item.amount;
    this.item.subtotalVat = this.item.subtotal * this.item.vat;
    if (this.item.amount == this.item.unit) {
      this.cartService.add(this.item);
    } else {
      this.cartService.update(this.item);
    }
    this.events.publish('cart:update', {
      user: "Muestra",
    });
  }

  remove() {
    if (this.item.amount > 0) {
      this.item.amount -= this.item.unit;
      this.tmpAmount = this.item.amount;
      if (this.item.amount == 0) this.cartService.delete(this.item);

      this.item.subtotal = this.item.cost * this.item.amount;
      this.item.subtotalVat = this.item.subtotal * this.item.vat;
      this.cartService.update(this.item);
    }
    this.events.publish('cart:update', {
      user: "Muestra",
    });
  }

  async errorToast(unit) {
    const toast = await this.toastCtrl.create({
      message:
        "La cantidad especificada no es válida, debe ingresar sólo múltiplos de " +
        unit,
      duration: 3000,
      animated: true,
      position: "top",
      color: "danger",
      translucent: true,
      buttons: [
        {
          text: "Ok",
          role: "cancel",
        },
      ],
    });
    toast.present();
  }
}
