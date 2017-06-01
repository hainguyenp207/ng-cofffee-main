import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  authentication = {};
  ngOnInit() {
    let data = localStorage.getItem("data");
    if (data) {
      this.authentication = JSON.parse(data);
    }
  }

}

