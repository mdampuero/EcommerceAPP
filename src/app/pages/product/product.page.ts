import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "../../models/product";
import { ProductService } from "src/app/services/product/product.service";
import { ApiService } from "../../services/api/api.service";
import { Events } from "src/app/services/events.service";
import { IonContent } from "@ionic/angular";

@Component({
  selector: "app-product",
  templateUrl: "./product.page.html",
  styleUrls: ["./product.page.scss"],
})
export class ProductPage implements OnInit {
  item: Product;
  @ViewChild(IonContent, null) content: IonContent;
  relateds: Product[];
  loadingRelated = true;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  slideOptsRelated = {
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
  constructor(
    public productService: ProductService,
    private apiService: ApiService,
    public events: Events
  ) {
    this.events.subscribe("product:self", (data: any) => {
      this.ngOnInit();
    });
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }
  ionViewDidEnter() {
    this.scrollToTop();
  }

  ngOnInit() {
    this.productService.loadStorage();
    this.item = this.productService.product;
    this.loadingRelated = true;
    this.apiService.getRelated(this.item.code).subscribe(
      (data) => {
        this.relateds = data;
      },
      (error) => {
        this.loadingRelated = false;
      },
      () => {
        this.loadingRelated = false;
      }
    );
    this.scrollToTop();
  }
}
