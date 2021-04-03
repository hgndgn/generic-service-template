import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Resource } from '../models/Resource.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { throwError } from 'rxjs/internal/observable/throwError';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends Resource> {

  protected finalUrl: string;

  constructor(
    protected http: HttpClient,
    @Inject(String) protected url: string,
    @Inject(String) protected endpoint: string) {
    this.finalUrl = url;

    if (endpoint) {
      this.finalUrl = `${url}/${endpoint}`;
    }
  }

  protected get(): Observable<HttpResponse<T>> {
    return this.http.get<T>(
      this.finalUrl, { observe: 'response' });
  }

  protected getAll(): Observable<T[]> {
    return this.http
      .get(this.finalUrl)
      .pipe(map((data: any) => data))
      .pipe(catchError(this.handleError));
  }

  protected post(resource: T): Observable<T> {
    return this.http
      .post<T>(this.finalUrl, resource)
      .pipe(map(data => data));
  }

  protected put(resource: T): Observable<T> {
    return this.http
      .put<T>(this.finalUrl, resource)
      .pipe(map(data => data));
  }

  protected delete(id: string | number): Observable<any> {
    const url = `${this.finalUrl}/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError));
  }

  protected withUrl(url: string, endpoint?: string) {
    const clone = cloneDeep(this);
    clone.finalUrl = url;
    if (endpoint) {
      clone.endpoint = endpoint;
      clone.finalUrl = `${url}/${endpoint}`;
    }
    return clone;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent) {
      // client side error
      errorMessage = error.error.message;
      console.error(error.error.message);
    } else {
      // server side error
      errorMessage = `${error.status}:\n${error.message}`;
    }

    return throwError(errorMessage);
  }
}
