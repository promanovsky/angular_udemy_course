import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscr: Subscription;

  constructor(private recipeService: RecipesService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
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
    if(this.authService.isAuthenticated()){
      this.router.navigate(['new'], {relativeTo: this.route});
    }else{
      this.router.navigate(['/signin']);
    }
  }
}
