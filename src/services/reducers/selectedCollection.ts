import {
  ADD_SELECTED_INGREDIENT,
  SET_SELECTED_BUN,
  SET_TOTAL_PRICE,
  REMOVE_SELECTED_ITEM,
  INSERT_SELECTED_INGREDIENT,
  SET_INSERT_POSITION,
  UPDATE_POSITION,
  CLEAR_SELECTION,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TSelectedCollectionActions,
} from "../actions/selectedCollection";
import { TIngredientPropType, TSelectedIngredientPropType } from "../../services/custom-types/custom-types";

export type TSelectedCollectionStateType = {
    collection: Array<TSelectedIngredientPropType>,
    bunData: TIngredientPropType | null,
    totalPrice: number,
    insertPosition: number,
    makingRequest: boolean,
    hasError: boolean,
};
const selectedCollectionState: TSelectedCollectionStateType = {
  collection: [],
  bunData: null,
  totalPrice: 0,
  insertPosition: -1,
  makingRequest: false,
  hasError: false,
};
export const selectedIngredientsReducer = (
  state = selectedCollectionState,
    action: TSelectedCollectionActions,
): TSelectedCollectionStateType => {
    //console.log("selectedIngredientsReducer");

    //console.log(action);
    switch (action.type) {
    case ADD_SELECTED_INGREDIENT: {
            const newElement: TSelectedIngredientPropType = { ...action.data, pos: state.collection.length };
            const newCollection: Array<TSelectedIngredientPropType> = [...state.collection, newElement].sort((a, b) =>
        a.pos > b.pos ? 1 : -1,
      );
      return {
        ...state,
          collection: newCollection,
          totalPrice: state.totalPrice + newElement.item.price,
      };
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.newPrice,
      };
    }
        case SET_SELECTED_BUN: {
            //console.log(SET_SELECTED_BUN)
            //console.log(action)
      let oldBunPrice = 0;
      if (state.bunData) {
        oldBunPrice = 2 * state.bunData.price;
            }
            const deltaPrice = 2 * action.data.price - oldBunPrice;
      return {
        ...state,
          bunData: action.data,
        totalPrice: state.totalPrice + deltaPrice,
      };
    }
        case INSERT_SELECTED_INGREDIENT: {
            //console.log(INSERT_SELECTED_INGREDIENT)
            //console.log(action)
      let newPos = state.insertPosition;
      if (newPos > state.collection.length || newPos < 0) {
        newPos = state.collection.length;
            }

            //console.log("newElement");
            //console.log(action);
            const newElement: TSelectedIngredientPropType = { item: action.data.data, pos: newPos };
      const firstPart = state.collection.filter((x) => x.pos < newPos);
      const secondPart = state.collection
        .filter((x) => x.pos >= newPos)
          .map((item) => {
              const result: TSelectedIngredientPropType = { ...item, pos: item.pos + 1 };
              return result;//{ data: item.item, pos: item.pos + 1 }
        });
            const newCollection:Array<TSelectedIngredientPropType> = [...firstPart, newElement, ...secondPart].sort(
        (a, b) => (a.pos > b.pos ? 1 : -1),
            );
            //console.log("newCollection");
            //console.log(newCollection);
      return {
        ...state,
          collection: newCollection,
          totalPrice: state.totalPrice + action.data.data.price,
        insertPosition: -1,
      };
    }
    case REMOVE_SELECTED_ITEM: {
      const removedItem = state.collection.filter(
        (item) => item.pos === action.pos,
            )[0];
            const removedItemPrice = removedItem ? removedItem.item.price : 0;

      const firstPart = state.collection.filter((x) => x.pos < action.pos);
      const secondPart = state.collection
        .filter((x) => x.pos > action.pos)
          .map((item) => {
              const result: TSelectedIngredientPropType = { ...item, pos: item.pos + 1 };
              return result;//{ data: item.item, pos: item.pos - 1 };
        });
            const newCollection: Array<TSelectedIngredientPropType> = [...firstPart, ...secondPart].sort((a, b) =>
        a.pos > b.pos ? 1 : -1,
      );
      return {
        ...state,
        totalPrice: state.totalPrice - removedItemPrice,
        collection: newCollection,
      };
    }
    case SET_INSERT_POSITION: {
      let newPos = action.newPos;
      if (state.insertPosition === 0 && action.newPos === -1) {
        newPos = 0;
      }
      return {
        ...state,
        insertPosition: newPos,
      };
    }
        case UPDATE_POSITION: {
            let oldPos:number = -1;
            if (!action.data.oldPos) {
                return state;
            }
            else {
                oldPos = action.data.oldPos as number;
            }

      let newPos = state.insertPosition;
            //console.log(UPDATE_POSITION);
            //console.log(state);
            //console.log(action);
      if (newPos < 0 || newPos > state.collection.length) {
        newPos = state.collection.length;
      }
            if (newPos > state.collection.length || newPos === oldPos) {
                return { ...state };
            }

            const search = state.collection.filter((x) => x.pos === oldPos);
            console.log(action.data)
            console.log(search)
            console.log(state.collection)


            const newElement: TSelectedIngredientPropType = {
                item: { ...state.collection.filter((x) => x.pos === oldPos)[0].item },
        pos: newPos,
      };
            const firstPart: Array<TSelectedIngredientPropType> = state.collection.filter(
                (x) => x.pos < oldPos && x.pos < newPos,
      );
            let secondPart: Array<TSelectedIngredientPropType> = [];
            let thirdPart: Array<TSelectedIngredientPropType> = [];

            if (newPos < oldPos) {
        secondPart = state.collection
            .filter((x) => x.pos < oldPos && x.pos >= newPos)
            .map((item) => {
                const result: TSelectedIngredientPropType = { item: item.item, pos: item.pos + 1 };
                return result;
              //return { data: item.item, pos: item.pos + 1 };
          });
                thirdPart = state.collection.filter((x) => x.pos > oldPos);
      } else {
        secondPart = state.collection
            .filter((x) => x.pos > oldPos && x.pos <= newPos)
            .map((item) => {
                const result: TSelectedIngredientPropType = { item: item.item, pos: item.pos - 1 };
                return result;
              //return { data: item.item, pos: item.pos - 1 };
          });
        thirdPart = state.collection.filter((x) => x.pos > newPos);
      }
            const newCollection: Array<TSelectedIngredientPropType> = [
        ...firstPart,
        newElement,
        ...secondPart,
        ...thirdPart,
      ].sort((a, b) => (a.pos > b.pos ? 1 : -1));
      return {
        ...state,
        collection: newCollection,
        insertPosition: -1,
      };
    }
        case CLEAR_SELECTION: {
            console.log(CLEAR_SELECTION)
      return {
        collection : [],
        bunData: null,
        totalPrice: 0,
          insertPosition: -1,
          makingRequest: false,
          hasError: false
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        makingRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        makingRequest: false,
        hasError: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        makingRequest: false,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};
