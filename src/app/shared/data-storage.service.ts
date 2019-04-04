import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RecipesService} from '../recipes/recipes.service';
import {Recipe} from '../recipes/recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Ingredient} from './ingredient.model';
import {Store} from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';


@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipesService: RecipesService,
              private store: Store<fromShoppingList.AppState>){}

  storeRecipes(): Observable<any> {
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-22.firebaseio.com/recipes.json', this.recipesService.getRecipes(), {
      reportProgress: true
    });
    return this.httpClient.request(req);
  }

  loadRecipes(): Observable<any> {
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-22.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    }).pipe(map(
        (recipes) => {
          console.log(recipes);
          for(let rcp of recipes) {
            if(!rcp['ingredients']){
              rcp['ingredients'] = [];
            }
          }
          return recipes;
        }))
      .pipe(map(
        (recipes: Recipe[]) => {
          this.recipesService.setRecipes(recipes);
        }
      ));
  }

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
