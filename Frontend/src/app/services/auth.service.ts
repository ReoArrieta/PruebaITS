import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthRequest } from '@models/request/authRequest';
import { Response } from '@models/response/response';
import { UserResponse } from '@models/response/userResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRequest } from '@models/request/userRequest';

const httpOption = {
  headers: new HttpHeaders({ 'Contend-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _url: string = 'http://localhost:3000/api/auth/';
  private userSubject: BehaviorSubject<UserResponse>;
  public user: Observable<UserResponse>;

  constructor(private _http: HttpClient, private _router: Router) {
    this.userSubject = new BehaviorSubject<UserResponse>(
      JSON.parse(localStorage.getItem('user') || '[]')
    );
    this.user = this.userSubject.asObservable();
  }

  public get userData(): UserResponse {
    return this.userSubject.value;
  }

  signin(model: AuthRequest): Observable<Response> {
    return this._http
      .post<Response>(this._url + 'signin', model, httpOption)
      .pipe(
        map((res) => {
          if (res.exito === 1) {
            const user: UserResponse = res.data;
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
          }
          return res;
        })
      );
  }

  signup(model: UserRequest): Observable<Response> {
    return this._http.post<Response>(this._url + 'signup', model, httpOption);
  }

  getUser(jwt: string): Observable<Response> {
    return this._http.get<Response>(`${this._url}${jwt}`);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next({username: '', token: ''});
    this._router.navigate(['/ingresar']);
  }

}
