import { Component, OnInit } from "@angular/core";
import {
  ModalController,
  ToastController,
  AlertController,
} from "@ionic/angular";
import { ApiService } from "../../services/api/api.service";
import { CartService } from "src/app/services/cart/cart.service";
import { LoadingService } from "../../services/loading/loading.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from "../../services/login/login.service";

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  private total = 0;
  private inputs;
  constructor(
    private socialSharing: SocialSharing,
    private router: Router,
    public loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public cartService: CartService,
    public modalController: ModalController,
    private loadingService: LoadingService,
    public toastCtrl: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    
  }
  async confirmSend() {
    this.inputs = [
      {
        name: "observations",
        type: "textarea",
        value: "",
        placeholder: "Sin comentarios",
      },
    ];
    if (this.loginService.user["isSeller"]) {
      this.inputs = [
        {
          name: "transport",
          type: "text",
          value: "",
          placeholder: "Transporte",
        },
        {
          name: "customerName",
          type: "text",
          value: "",
          placeholder: "Cliente",
        },
        {
          name: "observations",
          type: "textarea",
          value: "",
          placeholder: "Sin comentarios",
        },
      ];
    }
    //(this.loginService.user);
    const alert = await this.alertController.create({
      header: "Enviar pedido",
      // subHeader: '¿Está seguro que desea enviar este pedido?',
      message: "¿Desea agregar un comentario?",
      inputs: this.inputs,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Enviar",
          cssClass: "primary",
          handler: (data) => {
            if (this.loginService.user["isSeller"]) {
              this.send(data.observations,data.customerName,data.transport);
            } else {
              this.send(data.observations,null,null);
            }
          },
        },
      ],
    });

    await alert.present();
  }
  send(observations,customerName,transport) {
    this.loadingService.loadingPresent();
    this.apiService.sendOrder(this.cartService, observations,customerName,transport).subscribe(
      (data) => {
        this.apiService.sendEmail(data["id"]);
        this.cartService.clear();
        this.success("Su pedido fue enviado correctamente");
      },
      (error) => {
        this.loadingService.loadingDismiss();
        this.error();
        console.error(error);
      },
      () => {
        this.loadingService.loadingDismiss();
        this.router.navigateByUrl(`/orders`);
        this.dismiss();
      }
    );
  }
  share() {
    this.loadingService.loadingPresent();
    this.apiService.shareOrder(this.cartService).subscribe(
      (data) => {
        this.socialSharing.share(`Siga el siguiente enlace para descargar el archivo`, 'Nortcuyo - proforma', '',data['budget']['path']).then(() => {
          this.success("El carrito de compras se compartió correctamente");
        }).catch(() => {
          // Error!
        });
        this.loadingService.loadingDismiss();
      },
      (error) => {
        this.loadingService.loadingDismiss();
        this.error();
        console.error(error);
      },
      () => {
        
      }
    );
  }
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  async success(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      animated: true,
      color: "success",
      position: "top",
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
  async error() {
    const toast = await this.toastCtrl.create({
      message: "Se produjo un error, intente nuevamente mas tarde",
      duration: 4000,
      animated: true,
      color: "danger",
      position: "top",
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
