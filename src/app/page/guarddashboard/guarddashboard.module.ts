import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GuarddashboardPageRoutingModule } from './guarddashboard-routing.module';
import { GuarddashboardPage } from './guarddashboard.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    GuarddashboardPageRoutingModule,
  ],
  declarations: [GuarddashboardPage]
})
export class GuarddashboardPageModule {}
