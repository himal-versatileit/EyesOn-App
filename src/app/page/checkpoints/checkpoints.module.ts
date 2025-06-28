import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckpointsPageRoutingModule } from './checkpoints-routing.module';

import { CheckpointsPage } from './checkpoints.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckpointsPageRoutingModule
  ],
  declarations: [CheckpointsPage]
})
export class CheckpointsPageModule {}
