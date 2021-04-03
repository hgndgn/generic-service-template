import { Component, OnInit } from '@angular/core';

import { SampleService } from './core/services/sample.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'generic-service';

  constructor(private sampleService: SampleService) {
  }

  ngOnInit() {
    this.sampleService.getTodos().subscribe(console.log);
    this.sampleService.getTodoById("1").subscribe(console.log);
  }
}
