import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Ingredient} from './ingredient.model';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';


@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private store: Store<fromApp.AppState>){}

  storeIngredients() {
    this.store.dispatch(new ShoppingListActions.SaveIngredients(this.httpClient));
  }

  loadIngredients(): Observable<any> {
    return this.httpClient.get<Ingredient[]>('https://ng-recipe-book-22.firebaseio.com/ingredients.json')
      .pipe(map(
        (resp) => {
          this.store.dispatch(new ShoppingListActions.LoadIngredients(resp));
        }
      ));
  }
}
