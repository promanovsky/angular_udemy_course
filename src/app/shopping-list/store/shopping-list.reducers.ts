import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient,
  lastId: number
}

const initialState: State = {
  ingredients:[
    new Ingredient(0, 'Apples', 7),
    new Ingredient(1, 'Tomatoes', 5)
  ],
  editedIngredient: null,
  lastId: 2
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type){
    case ShoppingListActions.ADD_INGREDIENT:
      const ingToAdd = action.payload;
      ingToAdd.id = state.lastId;
      return {
        ...state,
        ingredients: [...state.ingredients, ingToAdd],
        lastId: state.lastId + 1
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return{
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
        lastId: state.lastId + action.payload.length
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredientsToUpdate = [...state.ingredients];
      const ing = ingredientsToUpdate.find(
        (s) => {
          return s.id === action.payload.id;
        }
      );
      ing.name = action.payload.name;
      ing.amount = action.payload.amount;
      return{
        ...state,
        ingredients: ingredientsToUpdate,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const ingredientsToDelete = [...state.ingredients];
      for (let ind = 0; ind < ingredientsToDelete.length; ind++) {
        if (ingredientsToDelete[ind].id === action.payload.id) {
          ingredientsToDelete.splice(ind, 1);
          break;
        }
      }
      return{
        ...state,
        ingredients: ingredientsToDelete,
        editedIngredient: null
      };
    case ShoppingListActions.START_EDIT:
      const editedIng = state.ingredients.find((s)=>{
         return s.id === action.payload;
      });
      return{
        ...state,
        editedIngredient: editedIng
      };
    case ShoppingListActions.LOAD_INGREDIENTS:
      return{
        ...state,
        ingredients: action.payload,
        editedIngredient: null
      };
    case ShoppingListActions.SAVE_INGREDIENTS:
      action.httpClient.put('https://ng-recipe-book-22.firebaseio.com/ingredients.json', [...state.ingredients]).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {console.log(error);
        }
      );
      return{
        ...state
      };
    case ShoppingListActions.STOP_EDIT:
      return{
        ...state,
        editedIngredient: null
      };
    default: return state;
  }
}
