import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from '@security/auth.guard';
import { JwtIntepceptor } from '@security/jwt.interceptor';
import { EntryComponent } from '@views/entry/entry.component';
import { NavbarComponent } from '@views/navbar/navbar.component';
import { OutputComponent } from '@views/output/output.component';
import { Page404Component } from '@views/page404/page404.component';
import { ProductComponent } from '@views/product/product.component';
import { SigninComponent } from '@views/signin/signin.component';
import { SignupComponent } from '@views/signup/signup.component';
import { ProductOptimalComponent } from './views/product-optimal/product-optimal.component';
import { ProductDefectiveComponent } from './views/product-defective/product-defective.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    NavbarComponent,
    OutputComponent,
    Page404Component,
    ProductComponent,
    SigninComponent,
    SignupComponent,
    ProductOptimalComponent,
    ProductDefectiveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtIntepceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
