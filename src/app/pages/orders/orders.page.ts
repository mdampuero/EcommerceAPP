import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../services/api/api.service";
import { LoadingService } from "../../services/loading/loading.service";
import { OrdersService } from "../../services/orders/orders.service";
import { IonInfiniteScroll } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.page.html",
  styleUrls: ["./orders.page.scss"],
})
export class OrdersPage implements OnInit {
  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  results: any[] = [];
  total = 0;
  page = 0;
  loaded = false;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private ordersService: OrdersService
  ) {}
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  getOrders() {
    // this.infiniteScroll.disabled = false;
    this.results = [];
    this.apiService.offset = 0;
    this.loadingService.loadingPresent();
    this.apiService.getOrders().subscribe(
      (data) => {
        //console.log(data);
        this.total = data["recordsFiltered"];
        this.results = data["results"];
        this.ordersService.items = this.results;
      },
      (error) => {
        this.loadingService.loadingDismiss();
        console.error(error);
      },
      () => {
        this.loadingService.loadingDismiss();
      }
    );
  }

  continue(event) {
    this.apiService.offset += this.apiService.limit;
    this.apiService.getOrders().subscribe(
      (data) => {
        if (
          data["results"].length + this.apiService.offset >=
          data["recordsFiltered"]
        ) {
          event.target.disabled = true;
        }
        this.results.push(...data["results"]);
        this.ordersService.items.push(...data["results"]);
      },
      (error) => {
      },
      () => {
        event.target.complete();
      }
    );
  }

  goToOrder(index) {
    this.router.navigateByUrl(`/orders/order/${index}`);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param && param.query && !this.loaded) {
        this.loaded = true;
        this.getOrders();
      } else if (!this.loaded) {
        this.loaded = true;
        this.getOrders();
      }
    });
  }
}
