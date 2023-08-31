import {
  SET_DRAG_STYLE_TYPE,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/utils";

const utilsState = {
  isDragged: false,
  isLoading: false,
  hasError: false,
};

export const utilsReducer = (state = utilsState, action) => {
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
