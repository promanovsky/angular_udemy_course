import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from  './recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';

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

  @Effect({dispatch:false})
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipesList')),
    switchMap(([action, state])=>{
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-22.firebaseio.com/recipes.json', state.recipes, {
        reportProgress: true
      });
      return this.httpClient.request(req);
    })
  );

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromApp.AppState>){}
}
