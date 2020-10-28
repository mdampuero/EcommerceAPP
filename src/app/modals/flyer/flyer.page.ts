import { Component, OnInit,Input } from "@angular/core";
import {
  ModalController,
  ToastController,
  AlertController,
} from "@ionic/angular";
import { environment } from "src/environments/environment";
import { ApiService } from "../../services/api/api.service";
import { LoadingService } from "../../services/loading/loading.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from "../../services/login/login.service";

@Component({
  selector: "app-flyer",
  templateUrl: "./flyer.page.html",
  styleUrls: ["./flyer.page.scss"],
})
export class FlyerPage implements OnInit {
  @Input() picture: string;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  public environment;
  constructor(
    public modalController: ModalController,  
  ) {
this.environment = environment;
  }

  ngOnInit() {
    console.log(this.picture);
  }
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
