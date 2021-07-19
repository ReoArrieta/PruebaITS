import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '@models/response/response';
import { OutputRequest } from '@models/request/outputRequest';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class OutputService {
  private _url: string = 'http://localhost:3000/api/output/';
  
  constructor(private _http: HttpClient) {}

  create(model: OutputRequest): Observable<Response> {
    return this._http.post<Response>(this._url, model, httpOption);
  }

  read(): Observable<Response> {
    return this._http.get<Response>(this._url);
  }

}
