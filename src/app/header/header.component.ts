import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() headerClicked = new EventEmitter<string>();

  headerItemClicked(menu: string) {
    this.headerClicked.emit(menu);
    console.log('headerItemClicker emitted for menu - ' + menu);
  }
}
