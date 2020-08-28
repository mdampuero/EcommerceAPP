import { Component, OnInit } from "@angular/core";
import { MenuController, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api/api.service";
import { LoadingService } from "../../services/loading/loading.service";
import { LoginService } from "../../services/login/login.service";
import { ConfigService } from "../../services/config/config.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public username = "";
  public password = "";
  constructor(
    private apiService: ApiService,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    private router: Router,
    public loginService: LoginService,
    public configService: ConfigService,
    private loadingService: LoadingService
  ) {
  }
  ngOnInit() {
    //this.loadingService.loadingPresent();
    this.apiService.configs().subscribe(
      (data: any) => {
        this.configService.save(data);
      },
      (error) => {
        //this.loadingService.loadingDismiss();
        this.errorToast(
          "Ocurrió un error al intentar conectarse con el servidor"
        );
      },
      () => {
        //this.loadingService.loadingDismiss();
      }
    );
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    if (this.loginService.user.id !== null) {
      this.username = this.loginService.user["email"];
      this.password = this.loginService.user["password"];
      this.login();
    }
  }
  register() {
    this.router.navigateByUrl(`/login/register`);
  }
  async errorToast(text) {
    this.password = "";
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000,
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

  login() {
    if (this.username.length == 0 || this.password.length == 0) {
      this.errorToast("Email o contraseñas incorrectos");
    } else {
      this.loadingService.loadingPresent();
      this.apiService.login(this.username, this.password).subscribe(
        (data: any) => {
          data.password = this.password;
          this.loginService.login(data);
          this.apiService.refreshToken();
          this.router.navigateByUrl(`/home`);
        },
        (error) => {
          this.loadingService.loadingDismiss();
          this.errorToast("Email o contraseñas incorrectos");
        },
        () => {
          this.loadingService.loadingDismiss();
        }
      );
    }
  }
}
