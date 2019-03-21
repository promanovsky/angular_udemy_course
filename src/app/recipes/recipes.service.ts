import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipesService {
  lastId = 2;
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      0,
      'Shnitzel',
      'This is a test 1',
      'https://www.maxpixel.net/static/photo/1x/Mushrooms-Recipe-Kitchen-French-Dish-2459679.jpg',
      [
        new Ingredient(0, 'meat', 1),
        new Ingredient(1, 'french fries', 2)
      ]),
    new Recipe(
      1,
      'Burger', 'This is a second recipe',
      'https://www.maxpixel.net/static/photo/1x/Mushrooms-Recipe-Kitchen-French-Dish-2459679.jpg',
      [
        new Ingredient(2, 'buns', 2),
        new Ingredient(3, 'meat', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice().find(
      (s) => {
        return s.id === id;
      }
    );
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    recipe.id = this.lastId++;
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(data: Recipe){
    const recipe = this.recipes.find(
      (s) => {
        return s.id === data.id;
      }
    );
    recipe.name = data.name;
    recipe.imagePath = data.imagePath;
    recipe.description = data.description;
    recipe.ingredients = data.ingredients;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    for(let ind=0; ind<this.recipes.length; ind++){
      if(this.recipes[ind].id === id){
        this.recipes.splice(ind, 1);
        break;
      }
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }
}
