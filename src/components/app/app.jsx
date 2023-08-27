import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import React, { useEffect, useState, useReducer } from "react";
import { Api } from "../../utils/Api.js";
import { apiConfig, selectedIngredientsMock } from "../../utils/constants";

import {
  fullCollectionReducer,
  selectedIngredientsReducer,
  modalStateReducer,
  modalState,
  selectedCollectionState,
  fullCollectionState,
} from "../../services/reducers";
import {
  FullCollectionContext,
  SelectedCollectionContext,
  ModalContext,
} from "../../services/appContext";
import {
  FULL_INGRIDIENTS,
  ADD_SELECTED_INGRIDIENT,
  SET_SELECTED_BUN,
  SET_MODAL_VIEW_STATE,
} from "../../services/actions/";

export const webApi = new Api(apiConfig);

function App() {
  const selectedStack = selectedIngredientsMock;
  const [isLoaded, setLoaded] = useState(false);
  const [fullCollection, fullCollectionDispatcher] = useReducer(
    fullCollectionReducer,
    fullCollectionState,
    undefined,
  );
  const [selectedIngredients, selectedIngredientsDispatcher] = useReducer(
    selectedIngredientsReducer,
    selectedCollectionState,
    undefined,
  );
  const [modal, modalStateDispatcher] = useReducer(
    modalStateReducer,
    modalState,
    undefined,
  );

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    webApi
      .getIngredients()
      .then((res) => {
        fullCollectionDispatcher({
          type: FULL_INGRIDIENTS,
          data: res.data,
        });
      })
      .catch((e) => {
        console.error("Failed to load ingredients data.");
      });
  }

  //ToDo:remove on dnd
  useEffect(() => {
    if (fullCollection.collection.length > 0) setLoaded(true);
  }, [fullCollection.collection]);

  useEffect(() => {
    function setMock() {
      if (isLoaded) addSelectedIngredient(selectedStack.pop());
    }
    setMock();
  }, [isLoaded, selectedIngredients]);
  //ToDo:remove

  function closeModal(node) {
    modalStateDispatcher({
      type: SET_MODAL_VIEW_STATE,
      isOpened: false,
    });
  }

  const handleCloseModal = (node) => closeModal(node);

  function addSelectedIngredient(id) {
    const element = getIngredientById(id);
    if (!element) {
      return;
    }
    if (element.type === "bun") {
      selectedIngredientsDispatcher({
        type: SET_SELECTED_BUN,
        data: element,
      });
    } else {
      selectedIngredientsDispatcher({
        type: ADD_SELECTED_INGRIDIENT,
        data: element,
      });
    }
  }

  function getIngredientById(id) {
    let result;
    result = fullCollection.collection.filter(
      (ingredient) => ingredient._id === id,
    )[0];

    return result;
  }

  return (
    <div className={styles.app}>
      <SelectedCollectionContext.Provider
        value={{ selectedIngredients, selectedIngredientsDispatcher }}
      >
        <ModalContext.Provider value={{ modal, modalStateDispatcher }}>
          <FullCollectionContext.Provider
            value={{ fullCollection, fullCollectionDispatcher }}
          >
            {modal.isModalOpened && (
              <Modal title={modal.modalPopupTitle} closeFunc={handleCloseModal}>
                {modal.modalPopupControl}
              </Modal>
            )}
            <AppHeader />
            <main className={styles.main}>
              <div className={styles.burgerBlock}>
                <BurgerIngredients />
                <BurgerConstructor />
              </div>
            </main>
          </FullCollectionContext.Provider>
        </ModalContext.Provider>
      </SelectedCollectionContext.Provider>
    </div>
  );
}

export default App;
