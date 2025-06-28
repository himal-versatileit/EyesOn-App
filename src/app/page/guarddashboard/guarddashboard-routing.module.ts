import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuarddashboardPage } from './guarddashboard.page';

const routes: Routes = [
  {
    path: '',
    component: GuarddashboardPage,
    children: [
      {
        path: '',
        redirectTo: 'gaurddetails',
        pathMatch: 'full'
      },
      {
        path: 'gaurddetails',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../gaurddetails/gaurddetails.module').then(m => m.GaurddetailsPageModule),
            outlet: 'gaurddetails'
          }
        ]
      },
      {
        path: 'shift',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../shift/shift.module').then(m => m.ShiftPageModule),
            outlet: 'shift'
          }
        ]
      },
      {
        path: 'checkpoints',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../checkpoints/checkpoints.module').then(m => m.CheckpointsPageModule),
            outlet: 'checkpoints'
          }
        ]
      },
      {
        path: 'incidents',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../incidents/incidents.module').then(m => m.IncidentsPageModule),
            outlet: 'incidents'
          }
        ]
      },
      {
        path: 'overview',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../overview/overview.module').then(m => m.OverviewPageModule),
            outlet: 'overview'
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuarddashboardPageRoutingModule {}
