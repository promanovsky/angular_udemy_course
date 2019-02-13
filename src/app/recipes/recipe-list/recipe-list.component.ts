import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipes: Recipe[] = [
    new Recipe('testRecipe1', 'This is a test 1',
      'https://www.maxpixel.net/static/photo/1x/Mushrooms-Recipe-Kitchen-French-Dish-2459679.jpg'),
    new Recipe('Second recipe', 'This is a second recipe',
      'https://www.maxpixel.net/static/photo/1x/Mushrooms-Recipe-Kitchen-French-Dish-2459679.jpg')
  ];

  @Output() recipeItemSelected = new EventEmitter<Recipe>();

  constructor() {
    this.recipeItemSelected.emit(this.recipes[0]);
  }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    console.log(recipe);
    this.recipeItemSelected.emit(recipe);
  }
}
