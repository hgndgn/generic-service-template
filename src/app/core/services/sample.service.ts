import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resource } from '../models/Resource.model';

export class Todo extends Resource {
}

@Injectable({
  providedIn: "root"
})
export class SampleService extends BaseService<Todo> {

  constructor(
    public http: HttpClient) {
    super(http, "https://jsonplaceholder.typicode.com", "todos")
  }

  getTodos() {
    return this.get();
  }

  getTodoById(id: string) {
    return this.withUrl("https://jsonplaceholder.typicode.com", "todos/" + id).get();
  }
}
