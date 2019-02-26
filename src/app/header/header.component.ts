import {Component, Output, EventEmitter} from '@angular/core';
import {NavigationService} from '../shared/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private navigateService: NavigationService) {}

  headerItemClicked(menu: string) {
    this.navigateService.navigateToFeature(menu);
    console.log('navigateService.navigate emitted for menu - ' + menu);
  }
}
