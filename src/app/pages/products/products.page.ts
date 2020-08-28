import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../services/api/api.service";
import { LoadingService } from "../../services/loading/loading.service";
import { IonInfiniteScroll, AlertController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../models/product";
import { Events } from "src/app/services/events.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"],
})
export class ProductsPage implements OnInit {
  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  results: Product[] = [];
  query: string = null;
  total = 0;
  page = 0;
  loaded = false;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    public events: Events
  ) {}

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  search(q: string) {
    this.infiniteScroll.disabled = false;
    this.query = q;
    if (this.query.length === 0) {
      this.apiService.sort = "";
      this.apiService.direction = Math.floor(Math.random() * 1000).toString();
    }
    this.results = [];
    this.apiService.offset = 0;
    this.loadingService.loadingPresent();
    this.apiService.search(this.query).subscribe(
      (data) => {
        this.total = data["recordsFiltered"];
        this.results = data["results"];
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.loadingService.loadingDismiss();
      }
    );
  }
  continue(event) {
    this.apiService.offset += this.apiService.limit;
    this.apiService.search(this.query).subscribe(
      (data) => {
        if (
          data["results"].length + this.apiService.offset >=
          data["recordsFiltered"]
        ) {
          event.target.disabled = true;
        }
        this.results.push(...data["results"]);
      },
      (error) => {
        console.error(error);
      },
      () => {
        event.target.complete();
      }
    );
  }

  ngOnDestroy() {
    this.events.destroy('products:research');
  }
  ngOnInit() {
    this.events.subscribe("products:research", (data: any) => {
      this.search(this.query);
    });
    this.activatedRoute.queryParams.subscribe((param) => {
      if (param && param.query && !this.loaded) {
        this.loaded = true;
        this.query = param.query;
        this.search(this.query);
      } else if (!this.loaded) {
        this.loaded = true;
        this.search("");
      }
    });
  }
  ionViewWillLeave() {}
}
