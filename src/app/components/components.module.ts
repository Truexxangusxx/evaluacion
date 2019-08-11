import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './loading/loading.component';
import { MensajeComponent } from './mensaje/mensaje.component';

@NgModule({
  declarations: [ErrorComponent, LoadingComponent, MensajeComponent],
  imports: [
    CommonModule
  ],
  exports: [ErrorComponent, LoadingComponent, MensajeComponent]
})
export class ComponentsModule { }
