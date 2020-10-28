import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlyerPage } from './flyer.page';

const routes: Routes = [
  {
    path: '',
    component: FlyerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlyerPageRoutingModule {}
