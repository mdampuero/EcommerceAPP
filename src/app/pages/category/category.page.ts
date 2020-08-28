import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api/api.service";
import { LoadingService } from "../../services/loading/loading.service";
import { IonInfiniteScroll } from "@ionic/angular";
import { Product } from "../../models/product";
import { Events } from "src/app/services/events.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit {
  category: any;
  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;
  results: Product[] = [];
  total = 0;
  page = 0;
  loaded = false;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    public events: Events
  ) {
  }
  load() {
    this.infiniteScroll.disabled = false;
    this.results = [];
    this.apiService.offset = 0;
    this.loadingService.loadingPresent();
    this.apiService.getByCategory(this.category.id).subscribe(
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
    this.apiService.getByCategory(this.category.id).subscribe(
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
    this.events.destroy('category:research');
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnInit() {
    this.events.subscribe("category:research", (data: any) => {
      this.load();
    });
    this.activatedRoute.queryParams.subscribe((param) => {
      this.category = param;
      if (!this.loaded) {
        this.loaded = true;
        this.category = param;
        this.load();
      }
    });
  }
}
