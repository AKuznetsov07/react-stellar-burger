import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import React, { useEffect, useState, useReducer } from "react";
import { Api } from '../../utils/Api.js';
import { apiConfig, selectedIngridientsMock } from "../../utils/constants";
//import { useDispatch, useSelector } from 'react-redux';


import { fullCollectionReducer, selectedIngridientsReducer, modalStateReducer, modalState, selectedCollectionState, fullCollectionState } from '../../services/reducers';
import { FullCollectionContext, SelectedCollectionContext, ModalContext } from '../../services/appContext';
import { FULL_INGRIDIENTS, ADD_SELECTED_INGRIDIENT, SET_SELECTED_BUN, SET_MODAL_VIEW_STATE } from '../../services/actions/';


export const webApi = new Api(apiConfig);

function App() {
    const selectedStack = selectedIngridientsMock;
    const [isLoaded, setLoaded] = useState(false);
    const [fullCollection, fullCollectionDispatcher] = useReducer(fullCollectionReducer, fullCollectionState, undefined);
    const [selectedIngridients, selectedIngridientsDispatcher] = useReducer(selectedIngridientsReducer, selectedCollectionState, undefined);
    const [modal, modalStateDispatcher] = useReducer(modalStateReducer, modalState, undefined);

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        webApi.getIngridients()
            .then(res => {
                fullCollectionDispatcher({
                    type: FULL_INGRIDIENTS,
                    data:res.data
                });
            })
            .catch(e => {
                console.error("Failed to load ingridients data.")
            });
    }

    //ToDo:remove on dnd
    useEffect(() => {
        if (fullCollection.collection.length>0)
            setLoaded(true);
    }, [fullCollection.collection])

    useEffect(() => {
        function setMock() {
            if (isLoaded)
                addSelectedIngridient(selectedStack.pop());
        }
        setMock();
    }, [isLoaded, selectedIngridients])
    //ToDo:remove

    function closeModal(node) {
        modalStateDispatcher({
            type: SET_MODAL_VIEW_STATE,
            isOpened: false
        });
    }

    const handleCloseModal = (node) => closeModal(node);

    function addSelectedIngridient(id) {
        const element = getIngridientById(id);
        if (!element) {
            return; }
        if (element.type === "bun") {
            selectedIngridientsDispatcher({
                type: SET_SELECTED_BUN,
                data: element
            });
        }
        else {
            selectedIngridientsDispatcher({
                type: ADD_SELECTED_INGRIDIENT,
                data: element
            });
        }
    }

    function getIngridientById(id) {
        let result;
        result = fullCollection.collection.filter((ingridient) => ingridient._id === id)[0];

        return result;
    }

    return (
        <div className={styles.app}>
            <SelectedCollectionContext.Provider value={{ selectedIngridients, selectedIngridientsDispatcher }}>
                <ModalContext.Provider value={{ modal, modalStateDispatcher }}>
                    <FullCollectionContext.Provider value={{ fullCollection, fullCollectionDispatcher }}>
                        {modal.isModalOpened && (<Modal title={modal.modalPopupTitle} closeFunc={handleCloseModal}>
                            {modal.modalPopupControl}
                        </Modal>)}
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