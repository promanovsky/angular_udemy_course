import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'course-project';
  loadedFeature = 'recipes';

  onNavigate(data) {
    console.log(data);
    this.loadedFeature = data;
  }
}
