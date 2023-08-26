import { combineReducers } from 'redux';
import IngridientDetails from "../../components/ingridient-info/ingridient-info";
import OrderInfo from "../../components/order-info/order-info";

import {
    FULL_INGRIDIENTS,
    SET_SELECTED_INGRIDIENTS,
    ADD_SELECTED_INGRIDIENT,
    SET_SELECTED_BUN,
    REMOVE_SELECTED_ITEM,
    SET_TOTAL_PRICE,
    SET_MODAL_CONTENT,
    SET_MODAL_VIEW_STATE,
    INGRIDIENT_MODAL_TYPE,
    ORDER_MODAL_TYPE
} from '../actions';

export const fullCollectionState = {
    collection: []
};
export const selectedCollectionState = {
    collection: [],
    bunData: null,
    totalPrice:0
};

export const modalState = {
    modalPopupTitle: null,
    modalPopupControl: null,
    isModalOpened: false
};

export function modalStateReducer (state = modalState, action) {
    switch (action.type) {
        case SET_MODAL_CONTENT: {
            let modalControl;
            switch (action.popupType) {
                case INGRIDIENT_MODAL_TYPE: {
                    modalControl = < IngridientDetails ingridientData={action.data} />;
                    break;
                }
                case ORDER_MODAL_TYPE: {
                    modalControl = < OrderInfo id={action.data} />;
                    break;
                }
                default: {
                    modalControl = null;
                }
            }
            return {
                ...state,
                modalPopupTitle: action.Title,
                modalPopupControl: modalControl
            };
        }
        case SET_MODAL_VIEW_STATE: {
            return {
                ...state,
                isModalOpened: action.isOpened
            };
        }
        default: {
            return state;
        }
    }
}

export function selectedIngridientsReducer(state = selectedCollectionState, action){

    switch (action.type) {
        case ADD_SELECTED_INGRIDIENT: {
            const newElement = { data: action.data, pos: state.collection.length }
            const newCollection = [...state.collection, newElement].sort((a, b) => a.pos > b.pos ? 1 : -1);
            return {
                ...state,
                collection: newCollection,
                totalPrice: state.totalPrice + action.data.price
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
                totalPrice: state.totalPrice + deltaPrice
            };
        }
        case SET_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: action.newPrice
            };
        }
        default: {
            return state;
        }
    }
}

export function fullCollectionReducer (state = fullCollectionState, action){
    switch (action.type) {
        case FULL_INGRIDIENTS: {
            return {
                ...state,
                collection: action.data
            };
        }
        default: {
            return state;
        }
    }
};

export const rootReducer = combineReducers({
    fullIngridients: fullCollectionReducer,
    selectedIngridients: selectedIngridientsReducer,
    modalState: modalStateReducer
});