import { Component, OnInit } from '@angular/core';
import { FakeService } from './fake.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';

  constructor(private fakeService: FakeService) {

  }

  ngOnInit() {
    this.fakeService.getData()
      .subscribe();
  }
}
