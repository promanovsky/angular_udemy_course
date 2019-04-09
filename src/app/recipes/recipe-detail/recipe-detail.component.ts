import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducers';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute,
              private router: Router, private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    if(this.isUserAuthenticate()){
      this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    }else{
      this.router.navigate(['/signin']);
    }
  }

  onDeleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id);
    this.router.navigate(['/recipes']);
  }

  isUserAuthenticate() {
    return this.store.select('auth').pipe(map(
      (authState: fromAuth.State)=>{
        return authState.authenticated;
      }));
  }
}
