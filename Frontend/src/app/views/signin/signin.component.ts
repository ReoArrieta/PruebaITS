import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from '@models/request/authRequest';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _apiAuth: AuthService
  ) {
    if (this._apiAuth.userData.token) this._router.navigate(['/']);
  }

  ngOnInit() {}

  formSignin = this._fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  signin(model: AuthRequest) {
    if (this.formSignin.valid) {
      this.loading = true;
      this._apiAuth.signin(model).subscribe((res) => {
        if (res.exito === 1) {
          this._router.navigate(['/']);
        } else if (res.exito === 0) {
          this.loading = false;
          alert('Usauario o contraseña incorrecto');
        }
      });
    }
  }

}
