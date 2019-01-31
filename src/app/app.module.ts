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
  MatSelectModule, MatInputModule
} from '@angular/material';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PigeonDatatableComponent } from './pigeon-datatable/pigeon-datatable.component';
import { PigeonDetailsComponent } from './pigeon-details/pigeon-details.component';
import { AddPigeonComponent } from './add-pigeon/add-pigeon.component';
import { RemovePigeonComponent } from './remove-pigeon/remove-pigeon.component';
import { EditPigeonComponent } from './edit-pigeon/edit-pigeon.component';
import {GraphQLModule} from './apollo.config';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MatToolbar,
    PigeonDatatableComponent,
    PigeonDetailsComponent,
    AddPigeonComponent,
    RemovePigeonComponent,
    EditPigeonComponent,
    LoginComponent
  ],
  entryComponents: [
    AddPigeonComponent,
    RemovePigeonComponent,
    EditPigeonComponent
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
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
