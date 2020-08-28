import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api/api.service";
import { LoadingService } from "../../services/loading/loading.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
})
export class CategoriesPage implements OnInit {
  public query = "";
  items: any;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.query = "";
    this.loadingService.loadingPresent();
    this.apiService.searchCategories().subscribe(
      (data) => {
        //console.log(data);
        this.items = data;
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.loadingService.loadingDismiss();
      }
    );
  }
  search(query: string) {
    this.router.navigate([`/products`], {
      queryParams: { query },
    });
  }
}
