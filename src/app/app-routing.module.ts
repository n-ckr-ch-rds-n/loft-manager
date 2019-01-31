import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PigeonDatatableComponent} from './pigeon-datatable/pigeon-datatable.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: 'pigeon/:id',
    component: PigeonDatatableComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
