import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../models/product";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login/login.service";
import { environment } from "src/environments/environment";
import { ProductService } from "src/app/services/product/product.service";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() items: Product[] = [];
  @Input() btnFavorite = true;
  @Input() btnAdd = true;
  @Input() btnAddIcon = "add-circle";
  @Input() btnLink = true;
  @Input() btnRemove = false;
  @Input() amounts = false;
  public environment;
  constructor(
    private router: Router,
    public loginService: LoginService,
    public productService: ProductService
  ) {
    this.environment = environment;
  }

  ngOnInit() {
    this.items.forEach((myObject, index) => {
      if (typeof myObject["currency"] == "undefined") {
        myObject["currency"] = myObject["productId"].currency;
      }
    });
  }
  goToProduct(item: Product) {
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = urlTree.root.children["primary"].segments
      .map((it) => it.path)
      .join("/");
    this.productService.save(item);
    if (this.btnLink) {
      this.router.navigate([`${urlWithoutParams}/product`], {
        queryParams: item,
      });
    }
  }
}
