import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api/api.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-preformatted',
  templateUrl: './preformatted.page.html',
  styleUrls: ['./preformatted.page.scss'],
})
export class PreformattedPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  public preformatteds:any;
  public data:Product[] = [];
  public selectPreformatted:string='';
  constructor(
    private apiService: ApiService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getPreformatteds()
  }
  onChange($event){
    this.ScrollToTop();
    this.selectPreformatted=$event.target.value;
    this.getPreformattedItems();
  }
  getPreformatteds(){
    this.apiService.getPreformatteds().subscribe(
      (data) => {
        this.preformatteds=data["data"];    
        this.selectPreformatted=this.preformatteds[0].id;
        this.getPreformattedItems();
      }
    );
  }
  ScrollToTop() {
    this.content.scrollToTop(500);
  }
  getPreformattedItems(){
    this.loadingService.loadingPresent();
    this.apiService.getPreformattedsItems(this.selectPreformatted).subscribe(
      (data) => {
        this.data=data.results;    
        console.log(data);    
        this.loadingService.loadingDismiss();
      },
      (error) => {
        this.loadingService.loadingDismiss();
      }
    );
  }

}
