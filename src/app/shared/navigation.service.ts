import {EventEmitter} from '@angular/core';

export class NavigationService {
  navigate = new EventEmitter<string>();
  loadedFeature = 'recipes';

  navigateToFeature(feature: string) {
    this.loadedFeature = feature;
    this.navigate.emit(this.loadedFeature);
  }
}
