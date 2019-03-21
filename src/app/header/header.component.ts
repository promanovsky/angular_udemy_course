import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) {}

  saveToDb() {
    this.dataStorageService.storeRecipes().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {console.log(error);
      }
    );
    this.dataStorageService.storeIngredients().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {console.log(error);
      }
    );
  }

  loadFromDb() {
    this.dataStorageService.loadRecipes().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {console.log(error);
      }
    );
    this.dataStorageService.loadIngredients().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {console.log(error);
      }
    );
  }


}
