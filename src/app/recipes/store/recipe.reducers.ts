import * as RecipeActions from './recipe.actions'
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import {last} from 'rxjs/operators';

export interface State {
  recipes: Recipe[],
  lastId : number
}

const initialState: State = {
  recipes: [
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
  ],
  lastId: 2
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type){
    case RecipeActions.SET_RECIPES:
      return{
        ...state,
        recipes:[...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      action.payload.id = state.lastId++;
      console.log(state.lastId);
      return{
        ...state,
        recipes: [...state.recipes, action.payload],
        lastId: state.lastId
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipesToUpdate = [...state.recipes];
      const recipe = recipesToUpdate.find((recipe)=>{
        return recipe.id === action.payload.id;
      });
      recipe.ingredients = action.payload.ingredients;
      recipe.description = action.payload.description;
      recipe.imagePath = action.payload.imagePath;
      recipe.name = action.payload.name;
      return{
        ...state,
        recipes: recipesToUpdate
      };
    case RecipeActions.DELETE_RECIPE:
      const recipesToDelete = [...state.recipes];
      for (let ind = 0; ind < recipesToDelete.length; ind++) {
        if (recipesToDelete[ind].id === action.payload.id) {
          recipesToDelete.splice(ind, 1);
          break;
        }
      }
      return{
        ...state,
        recipes: recipesToDelete
      };
    default:
      return state;
  }
}
