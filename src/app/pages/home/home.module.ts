import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { ComponentsModule } from '../../components/components.module';
// import { AddCartComponent } from '../../modals/add-cart/add-cart.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  entryComponents: [
    // AddCartComponent
  ],
  declarations: [HomePage,
    // AddCartComponent
  ]
})
export class HomePageModule {}
