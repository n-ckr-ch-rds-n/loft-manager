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

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MatToolbar,
    PigeonDatatableComponent,
    PigeonDetailsComponent,
    AddPigeonComponent,
    RemovePigeonComponent
  ],
  entryComponents: [AddPigeonComponent, RemovePigeonComponent],
  imports: [
    BrowserModule,
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
    MatInputModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
