import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrdersService } from "../../services/orders/orders.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.page.html",
  styleUrls: ["./order.page.scss"],
})
export class OrderPage implements OnInit {
  public order = {
    items: [],
    total: 0,
    observations: '',
    id: '',
    createdAt: '',
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService
  ) {
    const index = this.activatedRoute.snapshot.paramMap.get("index");
    this.order = this.ordersService.items[index];
    this.order["items"].forEach((myObject, index) => {
      this.order["items"][index]["name"] = myObject.description;
      this.order["items"][index]["picture"] = myObject.productId.picture;
    });
  }

  ngOnInit() {}
}
