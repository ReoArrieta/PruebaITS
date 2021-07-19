import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '@models/response/response';
import { EntryRequest } from '@models/request/entryRequest';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class EntryService {
  private _url: string = 'http://localhost:3000/api/entry/';
  
  constructor(private _http: HttpClient) {}

  create(model: EntryRequest): Observable<Response> {
    return this._http.post<Response>(this._url, model, httpOption);
  }

  read(): Observable<Response> {
    return this._http.get<Response>(this._url);
  }

}
