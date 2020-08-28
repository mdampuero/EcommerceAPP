import { Component, OnInit } from "@angular/core";
import { MenuController, ToastController } from "@ionic/angular";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api/api.service";
import { LoadingService } from "../../services/loading/loading.service";
import { LoginService } from "../../services/login/login.service";
import { ConfigService } from "../../services/config/config.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  public user = {
    name: "",
    document: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    provence: "",
    password: "",
    passwordRepeat: "",
  };

  constructor(
    private location: Location,
    private apiService: ApiService,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    private router: Router,
    public configService: ConfigService,
    public loginService: LoginService,
    private loadingService: LoadingService
  ) {
  }
  ngOnInit() {}

  async errorToast(message) {
    const toast = await this.toastCtrl.create({
      message: "Ocurrió un error en algunos campos:<ul>" + message + "</ul>",
      duration: 10000,
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
  async successToast() {
    const toast = await this.toastCtrl.create({
      message:
        "Te registraste correctamente en nuestro sistema ya puedes ingresar",
      duration: 3000,
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

  trans(index) {
    switch (index) {
      case "name":
        return "Nombre";
      case "document":
        return "CUIT/CUIL";
      case "password":
        return "Contraseña";
      case "customerCategory":
        return "Categoria";
      case "email":
        return "Email";
    }
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  register() {
    if (this.user.password != this.user.passwordRepeat) {
      this.errorToast("<li>Contraseña: Las contraseñas no son iguales</li>");
      return;
    }
    this.loadingService.loadingPresent();
    this.user["customerCategory"] = this.configService.config[
      "defaultCategory"
    ]["id"];
    this.apiService.register(this.user).subscribe(
      (data: any) => {
        this.successToast();
        this.location.back();
      },
      (error) => {
        let messageError = "";
        // tslint:disable-next-line: forin
        for (const f in error["error"]["form"]["children"]) {
          let errorItem = error["error"]["form"]["children"][f]["errors"];
          if (typeof errorItem != "undefined") {
            messageError +=
              "<li>" + this.trans(f) + ": " + errorItem[0] + "</li>";
          }
        }
        this.loadingService.loadingDismiss();
        this.errorToast(messageError);
      },
      () => {
        this.loadingService.loadingDismiss();
      }
    );
  }
}
