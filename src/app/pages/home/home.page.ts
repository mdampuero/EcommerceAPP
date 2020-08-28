import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  public query = "";
  constructor(private router: Router, public menuCtrl: MenuController) {}
  register() {
    this.router.navigateByUrl(`/page1`);
  }
  ngOnInit() {
    this.query = "";
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  search(query: string) {
    this.router.navigate([`/products`], {
      queryParams: { query },
    });
  }
}
