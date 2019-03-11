import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  lastId = 6;
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient(4, 'Apples', 7),
    new Ingredient(5, 'Tomatoes', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    console.log(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getLastId(): number {
    return this.lastId++;
  }

  getIngredient(id: number): Ingredient {
    return this.ingredients.slice().find(
      (s) => {
        return s.id === id;
      }
    );
  }

  updateIngredient(data: Ingredient) {
    const ing = this.ingredients.find(
      (s) => {
        return s.id === data.id;
      }
    );
    ing.name = data.name;
    ing.amount = data.amount;
  }

  removeIngredient(data: Ingredient) {
    // this.ingredients.
  }
}
