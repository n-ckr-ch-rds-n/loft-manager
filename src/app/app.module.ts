import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbar,
  MatTableModule, MatSortModule, MatCardModule } from '@angular/material';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PigeonDatatableComponent } from './pigeon-datatable/pigeon-datatable.component';
import { PigeonDetailsComponent } from './pigeon-details/pigeon-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MatToolbar,
    PigeonDatatableComponent,
    PigeonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
