import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckpointsPage } from './checkpoints.page';

const routes: Routes = [
  {
    path: '',
    component: CheckpointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckpointsPageRoutingModule {}
