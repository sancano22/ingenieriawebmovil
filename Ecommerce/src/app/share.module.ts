import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, IonicModule,RouterModule],
  exports: [HeaderComponent]          // <- aquí se exporta
})
export class SharedModule {}