import { combineReducers } from "redux";
import IngredientDetails from "../../components/ingredient-info/ingredient-info";
import OrderInfo from "../../components/order-info/order-info";

import {
  FULL_INGREDIENTS,
  ADD_SELECTED_INGREDIENT,
  SET_SELECTED_BUN,
  SET_TOTAL_PRICE,
  SET_MODAL_CONTENT,
  SET_MODAL_VIEW_STATE,
  INGREDIENT_MODAL_TYPE,
  ORDER_MODAL_TYPE,
  REMOVE_SELECTED_ITEM,
  INSERT_SELECTED_INGREDIENT,
  SET_INSERT_POSITION,
  UPDATE_POSITION,
  CLEAR_SELECTION,
  SET_DRAG_STYLE_TYPE,
} from "../actions";

const fullCollectionState = {
  collection: [],
};
const selectedCollectionState = {
  collection: [],
  bunData: null,
  totalPrice: 0,
  insertPosition: -1,
};

const modalState = {
  modalPopupTitle: null,
  modalPopupControl: null,
  isModalOpened: false,
};
const utilsState = {
  isDragged: false,
};
const modalStateReducer = (state = modalState, action) => {
  switch (action.type) {
    case SET_MODAL_CONTENT: {
      let modalControl;
      switch (action.popupType) {
        case INGREDIENT_MODAL_TYPE: {
          modalControl = <IngredientDetails ingredientData={action.data} />;
          break;
        }
        case ORDER_MODAL_TYPE: {
          modalControl = <OrderInfo id={action.data} />;
          break;
        }
        default: {
          modalControl = null;
        }
      }
      return {
        ...state,
        modalPopupTitle: action.Title,
        modalPopupControl: modalControl,
      };
    }
    case SET_MODAL_VIEW_STATE: {
      return {
        ...state,
        isModalOpened: action.isOpened,
      };
    }
    case UPDATE_POSITION: {
      return {
        ...state,
        isModalOpened: action.isOpened,
      };
    }
    default: {
      return state;
    }
  }
};

const selectedIngredientsReducer = (
  state = selectedCollectionState,
  action,
) => {
  switch (action.type) {
    case ADD_SELECTED_INGREDIENT: {
      const newElement = { data: action.data, pos: state.collection.length };
      const newCollection = [...state.collection, newElement].sort((a, b) =>
        a.pos > b.pos ? 1 : -1,
      );
      return {
        ...state,
        collection: newCollection,
        totalPrice: state.totalPrice + action.data.price,
      };
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.newPrice,
      };
    }
    case SET_SELECTED_BUN: {
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
      let newPos = state.insertPosition;
      if (newPos > state.collection.length || newPos < 0) {
        newPos = state.collection.length;
      }
      const newElement = { data: action.data, pos: newPos };
      const firstPart = state.collection.filter((x) => x.pos < newPos);
      const secondPart = state.collection
        .filter((x) => x.pos >= newPos)
        .map((item) => {
          return { data: item.data, pos: item.pos + 1 };
        });
      const newCollection = [...firstPart, newElement, ...secondPart].sort(
        (a, b) => (a.pos > b.pos ? 1 : -1),
      );
      return {
        ...state,
        collection: newCollection,
        totalPrice: state.totalPrice + action.data.price,
        insertPosition: -1,
      };
    }
    case REMOVE_SELECTED_ITEM: {
      const removedItem = state.collection.filter(
        (item) => item.pos === action.pos,
      )[0];
      const removedItemPrice = removedItem ? removedItem.data.price : 0;

      const firstPart = state.collection.filter((x) => x.pos < action.pos);
      const secondPart = state.collection
        .filter((x) => x.pos > action.pos)
        .map((item) => {
          return { data: item.data, pos: item.pos - 1 };
        });
      const newCollection = [...firstPart, ...secondPart].sort((a, b) =>
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
      let newPos = state.insertPosition;

      if (newPos < 0 || newPos > state.collection.length) {
        newPos = state.collection.length;
      }
      if (newPos > state.collection.length || newPos === action.data.oldPos) {
        return { ...state };
      }

      const newElement = {
        data: state.collection.filter((x) => x.pos === action.data.oldPos)[0]
          .data,
        pos: newPos,
      };
      const firstPart = state.collection.filter(
        (x) => x.pos < action.data.oldPos && x.pos < newPos,
      );
      let secondPart = [];
      let thirdPart = [];

      if (newPos < action.data.oldPos) {
        secondPart = state.collection
          .filter((x) => x.pos < action.data.oldPos && x.pos >= newPos)
          .map((item) => {
            return { data: item.data, pos: item.pos + 1 };
          });
        thirdPart = state.collection.filter(
          (x) => x.pos > action.data.oldPos,
        ) /*.map((item) => { return { data: item.data, pos: item.pos - 1 } })*/;
      } else {
        secondPart = state.collection
          .filter((x) => x.pos > action.data.oldPos && x.pos <= newPos)
          .map((item) => {
            return { data: item.data, pos: item.pos - 1 };
          });
        thirdPart = state.collection.filter(
          (x) => x.pos > newPos,
        ) /*.map((item) => { return { data: item.data, pos: item.pos - 1 } })*/;
      }
      const newCollection = [
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
      return {
        collection: [],
        bunData: null,
        totalPrice: 0,
        insertPosition: -1,
      };
    }
    default: {
      return state;
    }
  }
};

const fullCollectionReducer = (state = fullCollectionState, action) => {
  switch (action.type) {
    case FULL_INGREDIENTS: {
      return {
        ...state,
        collection: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

const utilsReducer = (state = utilsState, action) => {
  switch (action.type) {
    case SET_DRAG_STYLE_TYPE: {
      return {
        ...state,
        isDragged: action.isDragged,
      };
    }
    default: {
      return state;
    }
  }
};
export const rootReducer = combineReducers({
  fullIngredients: fullCollectionReducer,
  selectedIngredients: selectedIngredientsReducer,
  modalState: modalStateReducer,
  utils: utilsReducer,
});
