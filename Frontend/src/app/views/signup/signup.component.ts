import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserRequest } from '@models/request/userRequest';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {}

  formSignup = this._fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-z ]+'),
      ],
    ],
    surname: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-z ]+'),
      ],
    ],
    identification: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      },
    ],
    username: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      },
    ],
    email: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(30),
        ],
      },
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ],
    ],
  });

  signup(model: UserRequest) {
    if (this.formSignup.valid) {
      this.loading = true;
      this._authService.signup(model).subscribe((res) => {
        if (res.exito === 1) {
          alert('Bienvenido a ITSense, ahora inicia sesión');
          this._router.navigate(['/ingresar']);
        }else {
          alert('Error: ' + res.message);
          this.loading = true;
        }
      });
    }
  }
}
