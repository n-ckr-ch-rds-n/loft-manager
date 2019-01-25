import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PigeonDatatableComponent} from './pigeon-datatable/pigeon-datatable.component';

const routes: Routes = [
  {
    path: 'pigeon/:id',
    component: PigeonDatatableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
