import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscr: Subscription;

  constructor(private recipeService: RecipesService, private router: Router, private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscr = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[])=> {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(){
    this.subscr.unsubscribe();
  }

  navigateToNewRecipe() {
    if(this.isUserAuthenticate()){
      this.router.navigate(['new'], {relativeTo: this.route});
    }else{
      this.router.navigate(['/signin']);
    }
  }

  isUserAuthenticate() {
    return this.store.select('auth').pipe(map(
      (authState: fromAuth.State)=>{
        return authState.authenticated;
      }));
  }
}
