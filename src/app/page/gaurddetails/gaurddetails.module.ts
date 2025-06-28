import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaurddetailsPageRoutingModule } from './gaurddetails-routing.module';
import { RouterModule } from '@angular/router';
import { GaurddetailsPage } from './gaurddetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaurddetailsPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: GaurddetailsPage
      }
    ])
  ],
  declarations: [GaurddetailsPage]
})
export class GaurddetailsPageModule {}
