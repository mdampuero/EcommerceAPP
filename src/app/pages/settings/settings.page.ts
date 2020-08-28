import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login/login.service";
import { ApiService } from "../../services/api/api.service";
import { ToastController } from "@ionic/angular";
import { LoadingService } from "../../services/loading/loading.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  public user = {
    name: "",
    email: "",
    document: "",
    phone: "",
    address: "",
    city: "",
    provence: "",
  };
  constructor(
    public loginService: LoginService,
    private apiService: ApiService,
    public toastCtrl: ToastController,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.user = this.loginService.user;
    this.user["customerCategory"] = this.loginService.user[
      "customerCategory"
    ].id;
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
        "Tus datos se actualizaron correctamente",
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

  onClick() {
    this.loadingService.loadingPresent();
    this.apiService.updateCustomer(this.user).subscribe(
      (data: any) => {
        this.successToast();
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
