import { Component, OnInit, Input } from "@angular/core";
import { LoginService } from "../../services/login/login.service";
@Component({
  selector: "app-price",
  templateUrl: "./price.component.html",
  styleUrls: ["./price.component.scss"],
})
export class PriceComponent implements OnInit {
  @Input() value = 0;
  @Input() size = "large";
  constructor(public loginService: LoginService) {}

  ngOnInit() {}
}
