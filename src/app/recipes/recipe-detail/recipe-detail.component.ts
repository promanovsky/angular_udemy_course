import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {NavigationService} from '../../shared/navigation.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipesService} from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private navigationService: NavigationService, private recipeService: RecipesService) { }

  ngOnInit() {
  }

  onAddToShoppingList() {
    this.navigationService.navigateToFeature('shopping-service');
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
