import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaurddetailsPage } from './gaurddetails.page';

const routes: Routes = [
  {
    path: '',
    component: GaurddetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaurddetailsPageRoutingModule {}
