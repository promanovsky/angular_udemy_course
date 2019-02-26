import {Component, OnInit} from '@angular/core';
import {NavigationService} from './shared/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'course-project';
  loadedFeature = 'recipes';

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.loadedFeature = this.navigationService.loadedFeature;
    this.navigationService.navigate.subscribe(
      (menu: string) => {
        this.loadedFeature = menu;
      }
    );
  }

}
