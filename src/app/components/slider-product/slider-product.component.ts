import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../models/product";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ProductService } from "src/app/services/product/product.service";
import { LoginService } from "src/app/services/login/login.service";
import { CartService } from "src/app/services/cart/cart.service";
import { Events } from "src/app/services/events.service";

@Component({
  selector: "app-slider-product",
  templateUrl: "./slider-product.component.html",
  styleUrls: ["./slider-product.component.scss"],
})
export class SliderProductComponent implements OnInit {
  @Input() product: Product;
  public environment: any;
  constructor(
    public events: Events,
    private router: Router,
    public productService: ProductService,
    private loginService: LoginService,
    public cartService: CartService
  ) {
    this.environment = environment;
  }

  ngOnInit() {
    this.product.cost = this.product.price * this.loginService.user["customerCategory"].discount;
    const itemCart = this.cartService.list.find(
      (listData) => listData.code === this.product.code
    );
    if (itemCart) {
      this.product.amount = itemCart.amount;
    } else {
      this.product.amount = 0;
    }
  }

  goToProduct(item: Product) {
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = urlTree.root.children["primary"].segments
      .map((it) => it.path)
      .join("/");
    this.productService.save(item);
    this.events.publish('product:self', {
      user: "Muestra",
    });
    //console.log(urlWithoutParams);
    if (urlWithoutParams.indexOf("product") !== -1) {
        
      } else {
        this.router.navigate([`${urlWithoutParams}/product`], {
          queryParams: item,
        });
      }
  }
}
