import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbar,
  MatTableModule,
  MatSortModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatOptionModule,
  MatSelectModule, MatInputModule, MatPaginatorModule
} from '@angular/material';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PigeonDetailsComponent } from './pigeon-details/pigeon-details.component';
import { AddPigeonComponent } from './add-pigeon/add-pigeon.component';
import { RemovePigeonComponent } from './remove-pigeon/remove-pigeon.component';
import { EditPigeonComponent } from './edit-pigeon/edit-pigeon.component';
import {GraphQLModule} from './apollo.config';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AuthService} from './services/auth.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DatatableComponent } from './datatable/datatable.component';
import { LoadingComponent } from './loading/loading.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MatToolbar,
    HomeScreenComponent,
    PigeonDetailsComponent,
    AddPigeonComponent,
    RemovePigeonComponent,
    EditPigeonComponent,
    LoginComponent,
    PageNotFoundComponent,
    DatatableComponent,
    LoadingComponent,
    ImageCarouselComponent
  ],
  entryComponents: [
    AddPigeonComponent,
    RemovePigeonComponent,
    EditPigeonComponent,
    PigeonDetailsComponent,
    ImageCarouselComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    SlickCarouselModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
