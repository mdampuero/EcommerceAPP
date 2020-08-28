import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api/api.service";

@Component({
  selector: "app-products-salient",
  templateUrl: "./products-salient.component.html",
  styleUrls: ["./products-salient.component.scss"],
})
export class ProductsSalientComponent implements OnInit {
  data: any;
  loadingSalients = true;
  slideOpts = {
    initialSlide: 0,
    pager: false,
    slidesPerView: 1.5,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 50,
      modifier: 1,
      slideShadows: true,
    },
    speed: 400,
  };
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getSalients().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        this.loadingSalients = false;
      },
      () => {
        this.loadingSalients = false;
      }
    );
  }
}
