import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from  './recipe.actions';
import {map, switchMap} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes)=>{
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-22.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      })
    }),
    map(
      (recipes) => {
        console.log(recipes);
        for(let rcp of recipes) {
          if(!rcp['ingredients']){
            rcp['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      })
  );

  constructor(private actions$: Actions, private httpClient: HttpClient){}
}
