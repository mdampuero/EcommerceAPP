import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreformattedPageRoutingModule } from './preformatted-routing.module';

import { PreformattedPage } from './preformatted.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    PreformattedPageRoutingModule
  ],
  declarations: [PreformattedPage]
})
export class PreformattedPageModule {}
