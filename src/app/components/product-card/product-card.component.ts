import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../models/product";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { ProductService } from "src/app/services/product/product.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  @Input() items: Product[] = [];
  @Input() isFull = false;
  @Input() btnLink = false;
  public environment;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  constructor(private router: Router, public productService: ProductService) {
    this.environment = environment;
  }

  ngOnInit() {}

  goToProduct(item: Product) {
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');
    this.productService.save(item);
    if (this.btnLink) {
      this.router.navigate([`${urlWithoutParams}/product`], {
        queryParams: item,
      });
    }
  }
}
