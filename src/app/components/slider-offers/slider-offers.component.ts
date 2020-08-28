import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api/api.service";
import { LoadingService } from "../../services/loading/loading.service";
import { ProductService } from "src/app/services/product/product.service";
import { environment } from "src/environments/environment";
import { Product } from "../../models/product";
import { CartService } from "src/app/services/cart/cart.service";

@Component({
  selector: "app-slider-offers",
  templateUrl: "./slider-offers.component.html",
  styleUrls: ["./slider-offers.component.scss"],
})
export class SliderOffersComponent implements OnInit {
  public offers = [];
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
    speed: 1500,
  };
  public environment;
  constructor(
    private apiService: ApiService,
    private loadingService: LoadingService,
    private router: Router,
    public cartService: CartService,
    public productService: ProductService
  ) {
    this.environment = environment;
  }
  goToProduct(item: Product) {
    this.productService.save(item);
    this.router.navigate([`/home/product`], {
      queryParams: item,
    });
  }
  goToCategory(item) {
    this.router.navigate([`/home/category`], {
      queryParams: item,
    });
  }
  ngOnInit() {
    //this.loadingService.loadingPresent();
    this.apiService.getOffers().subscribe(
      (data) => {
        this.offers = data["data"];
        this.offers.forEach((myObject, index) => {
          if (myObject.type == "BY_PRODUCT") {
            const itemCart = this.cartService.list.find(
              (listData) => listData.code === myObject.product.code
            );
            if (itemCart) {
              myObject.product.amount = itemCart.amount;
            } else {
              myObject.product.amount = 0;
            }
          }
        });
      },
      (error) => {
       // this.loadingService.loadingDismiss();
      },
      () => {
       // this.loadingService.loadingDismiss();
      }
    );
  }
}
