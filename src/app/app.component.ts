import { Component, OnInit } from "@angular/core";
import { FCM } from "@ionic-native/fcm/ngx";
import { Platform, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { CartPage } from "./modals/cart/cart.page";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login/login.service";
import { FirebaseService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public token = "";
  public appPages = [
    {
      title: "Inicio",
      url: "/home",
      isModal: false,
      isLogout: false,
      icon: "home",
    },
    {
      title: "Productos",
      url: "/categories",
      isModal: false,
      isLogout: false,
      icon: "hammer",
    },
    {
      title: "Carrito de compras",
      url: "/cart",
      isModal: true,
      icon: "cart",
    },
    {
      title: "Favoritos",
      url: "/favorites",
      isModal: false,
      isLogout: false,
      icon: "heart",
    },
    {
      title: "Pedidos",
      url: "/orders",
      isModal: false,
      isLogout: false,
      fa: "fa-clipboard-list",
    },
    {
      title: "Mis datos",
      url: "/settings",
      isModal: false,
      isLogout: false,
      icon: "person",
    },
    {
      title: "Salir",
      url: "/logout",
      isModal: false,
      isLogout: true,
      icon: "exit",
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private firebaseService: FirebaseService,
    public loginService: LoginService,
    public modalController: ModalController,
    private fcm: FCM
  ) {
    this.initializeApp();
    platform.ready().then(() => {
      this.fcm.getToken().then((token) => {
        this.firebaseService.save({
          token: token,
        });
      }).catch((err) => {
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  async goToModal() {
    const modal = await this.modalController.create({
      component: CartPage,
    });
    return await modal.present();
  }
  logout() {
    this.loginService.logout();
    this.router.navigateByUrl(`/login`);
  }
  ngOnInit() {
    

    // if (this.loginService.user.id == null) {
    //   this.router.navigateByUrl(`/login`);
    // }
  }
}
