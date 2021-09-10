import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreformattedPage } from './preformatted.page';

const routes: Routes = [
  {
    path: '',
    component: PreformattedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreformattedPageRoutingModule {}
