import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PrivateAppRoutingModule } from './private-app-routing.module';
import { PrivateAppComponent } from './private-app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from '../services/auth-services.component';
import { AuthGuard } from '../services/auth-guard.componet';
import { ArticleListComponent } from '../article-list/article-list.component';
import { ArticleAddComponent } from '../article-add/article-add.component';
import { ArticleEditComponent } from '../article-edit/article-edit.component';
import { AngularMaterialModule } from '../material.module';

@NgModule({
  declarations: [
    PrivateAppComponent,
    ArticleListComponent,
    ArticleAddComponent,
    ArticleEditComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PrivateAppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class PrivateAppModule { }
