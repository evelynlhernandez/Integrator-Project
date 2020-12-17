import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth-services.component';
import { AngularMaterialModule } from './material.module';
import { PrivateAppModule } from './private-app/private-app.module';
import { ArticleService } from './services/article-services.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ArticleCommentComponent } from './article-comment/article-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticleCommentComponent,
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrivateAppModule
  ],
  exports: [],
  providers: [
    AuthService,
    ArticleService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
