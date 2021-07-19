import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductRequest } from '@models/request/productRequest';
import { Response } from '@models/response/response';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _url: string = 'http://localhost:3000/api/products/';
  
  constructor(private _http: HttpClient) {}

  read(): Observable<Response> {
    return this._http.get<Response>(this._url);
  }

  readOptimal(): Observable<Response> {
    return this._http.get<Response>(this._url + 'optimal');
  }

  readDefective(): Observable<Response> {
    return this._http.get<Response>(this._url + 'defective');
  }

  update(model: ProductRequest): Observable<Response> {
    return this._http.put<Response>(this._url, model, httpOption);
  }

}
