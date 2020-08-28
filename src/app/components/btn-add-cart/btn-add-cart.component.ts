import { Component, OnInit, Input } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { CartService } from "src/app/services/cart/cart.service";
import { Product } from "src/app/models/product";

@Component({
  selector: "app-btn-add-cart",
  templateUrl: "./btn-add-cart.component.html",
  styleUrls: ["./btn-add-cart.component.scss"],
})
export class BtnAddCartComponent implements OnInit {
  @Input() isFull = false;
  @Input() item: Product;
  @Input() icon = "add-circle";
  @Input() size = "large";
  constructor(
    public cartService: CartService,
    public alertController: AlertController,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async addCart() {
    let itemStorage = this.cartService.get(this.item.code);
    const alert = await this.alertController.create({
      header: itemStorage ? "Actualizar cantidad" : "Ingrese la cantidad",
      inputs: [
        {
          name: "amount",
          type: "number",
          value: itemStorage ? itemStorage.amount : this.item.amount,
          placeholder: "ej:100",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            this.item.amount = +data.amount;
            this.item.subtotal = this.item.cost * this.item.amount;
            this.item.subtotalVat = this.item.subtotal * this.item.vat;
            if (itemStorage) {
              this.cartService.update(this.item);
            } else {
              this.cartService.add(this.item);
            }
            this.toast();
          },
        },
      ],
    });

    await alert.present();
  }

  async toast() {
    const toast = await this.toastCtrl.create({
      message: "Producto agregado",
      duration: 2000,
      animated: true,
      position: 'top',
      color: "primary",
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
