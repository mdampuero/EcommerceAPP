import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-flyer',
  templateUrl: './flyer.page.html',
  styleUrls: ['./flyer.page.scss'],
})
export class FlyerPage implements OnInit {
  data:any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  public environment;
  constructor(private activatedRoute: ActivatedRoute,) { 
    this.environment = environment;
    this.activatedRoute.queryParams.subscribe(params => {
        this.data = params;
    });
  }

  ngOnInit() {
   
  }

}
