import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddTagDialogComponent } from './dialog/add-tag-dialog/add-tag-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms'
import {MatInputModule} from '@angular/material/input';
import { AddObjectClassComponent } from './dialog/add-object-class-dialog/add-object-class-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTagDialogComponent,
    AddObjectClassComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
