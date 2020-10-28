import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlyerPageRoutingModule } from './flyer-routing.module';

import { FlyerPage } from './flyer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlyerPageRoutingModule
  ],
  declarations: [FlyerPage]
})
export class FlyerPageModule {}
