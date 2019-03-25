import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RecipesService} from '../recipes/recipes.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpService: Http, private recipesService: RecipesService, private shoppingListService: ShoppingListService,
              private authService: AuthService){}

  storeRecipes(): Observable<any> {
    const token = this.authService.getToken();
    return this.httpService.put('https://ng-recipe-book-22.firebaseio.com/recipes.json?auth='+token, this.recipesService.getRecipes());
  }

  loadRecipes(): Observable<any> {
    const token = this.authService.getToken();
    return this.httpService.get('https://ng-recipe-book-22.firebaseio.com/recipes.json?auth='+token)
      .pipe(map(
        (resp: Response) => {
          const recipes: Recipe[] = resp.json();
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

  storeIngredients(): Observable<any> {
    const token = this.authService.getToken();
    return this.httpService.put('https://ng-recipe-book-22.firebaseio.com/ingredients.json?auth='+token, this.shoppingListService.getIngredients());
  }

  loadIngredients(): Observable<any> {
    const token = this.authService.getToken();
    return this.httpService.get('https://ng-recipe-book-22.firebaseio.com/ingredients.json?auth='+token)
      .pipe(map(
        (resp: Response) => {
          this.shoppingListService.setIngredients(resp.json());
        }
      ));
  }
}
