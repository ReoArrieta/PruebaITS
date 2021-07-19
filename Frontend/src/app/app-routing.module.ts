import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@security/auth.guard';
import { EntryComponent } from '@views/entry/entry.component';
import { OutputComponent } from '@views/output/output.component';
import { Page404Component } from '@views/page404/page404.component';
import { ProductDefectiveComponent } from '@views/product-defective/product-defective.component';
import { ProductOptimalComponent } from '@views/product-optimal/product-optimal.component';
import { ProductComponent } from '@views/product/product.component';
import { SigninComponent } from '@views/signin/signin.component';
import { SignupComponent } from '@views/signup/signup.component';

const routes: Routes = [
  { path: '',  canActivate: [AuthGuard], component: ProductComponent },
  { path: 'productos-optimos', canActivate: [AuthGuard], component: ProductOptimalComponent },
  { path: 'productos-defectuosos', canActivate: [AuthGuard], component: ProductDefectiveComponent },
  { path: 'entradas', canActivate: [AuthGuard], component: EntryComponent },
  { path: 'salidas', canActivate: [AuthGuard], component: OutputComponent },
  { path: 'ingresar', component: SigninComponent },
  { path: 'registrarse', component: SignupComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
