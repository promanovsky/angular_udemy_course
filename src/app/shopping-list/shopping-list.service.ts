import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  lastId = 2;
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient(0, 'Apples', 7),
    new Ingredient(1, 'Tomatoes', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    console.log(ingredient);
    this.lastId++;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.lastId += ingredients.length;
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
    for (let ind = 0; ind < this.ingredients.length; ind++) {
      if (this.ingredients[ind].id === data.id) {
        this.ingredients.splice(ind, 1);
        break;
      }
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  setIngredients(ingredients: Ingredient[]){
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
