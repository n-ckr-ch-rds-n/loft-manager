import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PigeonDatatableComponent} from './pigeon-datatable/pigeon-datatable.component';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'pigeon/:id',
    component: PigeonDatatableComponent
  },
  {
    path: 'pigeon',
    component: PigeonDatatableComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
