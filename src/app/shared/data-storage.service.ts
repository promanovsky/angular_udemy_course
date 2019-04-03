import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RecipesService} from '../recipes/recipes.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Ingredient} from './ingredient.model';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipesService: RecipesService, private shoppingListService: ShoppingListService,
              private authService: AuthService){}

  storeRecipes(): Observable<any> {
    //const token = this.authService.getToken();
    /*return this.httpClient.put('https://ng-recipe-book-22.firebaseio.com/recipes.json', this.recipesService.getRecipes(),{
        observe: 'body',
        params: new HttpParams().set('auth', token)
        }
      );*/
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-22.firebaseio.com/recipes.json', this.recipesService.getRecipes(), {
      reportProgress: true
    });
    return this.httpClient.request(req);
  }

  loadRecipes(): Observable<any> {
    //const token = this.authService.getToken();
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

  storeIngredients(): Observable<any> {
    //const token = this.authService.getToken();
    return this.httpClient.put('https://ng-recipe-book-22.firebaseio.com/ingredients.json', this.shoppingListService.getIngredients());
  }

  loadIngredients(): Observable<any> {
    //const token = this.authService.getToken();
    return this.httpClient.get<Ingredient[]>('https://ng-recipe-book-22.firebaseio.com/ingredients.json')
      .pipe(map(
        (resp) => {
          this.shoppingListService.setIngredients(resp);
        }
      ));
  }
}
