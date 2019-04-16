import {Component, OnInit} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipesActions from '../../recipes/store/recipe.actions';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import {take} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  authState: Observable<fromAuth.State>;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute,
              private router: Router, private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = +params['id'];
          this.store.select('recipesList').pipe(take(1)).subscribe((recipeList: fromRecipe.State)=>{
            this.recipe = recipeList.recipes.find((item)=>{
              return item.id === id;
            });
          });
        }
      );
    this.authState = this.store.select('auth');
  }

  onAddToShoppingList() {
    this.authState.subscribe((authState: fromAuth.State)=>{
       if(authState.authenticated){
         this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
       }else {
         this.router.navigate(['/signin']);
       }
    });
  }

  onDeleteRecipe(id: number) {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipe));
    this.router.navigate(['/recipes']);
  }
}
