import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import React, { useEffect, useState } from "react";
import { Api } from '../../utils/Api.js';
import { apiConfig, selectedIngridientsMock } from "../../utils/constants";
import { useDispatch, useSelector } from 'react-redux';


import { FULL_INGRIDIENTS, ADD_SELECTED_INGRIDIENT, SET_SELECTED_BUN, SET_MODAL_VIEW_STATE } from '../../services/actions/';


export const webApi = new Api(apiConfig);

function App() {
    const dispatch = useDispatch();
    const selectedStack = selectedIngridientsMock;//ToDo:remove

    const modalControl = useSelector(store => store.modalState.modalPopupControl);
    const isModalOpened = useSelector(store => store.modalState.isModalOpened);
    const modalTitle = useSelector(store => store.modalState.modalPopupTitle);

    const ingridients = useSelector(store => store.fullIngridients.collection);
    const selectedIngridientsList = useSelector(store => store.selectedIngridients.collection);
    const bunId = useSelector(store => store.selectedIngridients.bunId);
    //ToDo:remove
    const [isLoaded, setLoaded] = useState(false);

    const [ingridientsRequest, setIngridientsRequest] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        webApi.getIngridients(setIngridientsRequest)
            .then(res => {
                //setIngridients(newData.data);
                dispatch({
                    type: FULL_INGRIDIENTS,
                    data:res.data
                });
            })
            .catch(e => {
                console.error("Failed to load ingridients data.")
                setIngridientsRequest(false);
            });
    }

    //ToDo:remove on dnd
    useEffect(() => {
        if (ingridients.length>0)
            setLoaded(true);
    }, [ingridients])
    useEffect(() => {
        function setMock() {
            if (isLoaded)
                addSelectedIngridient(selectedStack.pop());
        }
        setMock();
    }, [isLoaded, selectedIngridientsList,bunId])
    //ToDo:remove




    function closeModal(node) {
        dispatch({
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
            dispatch({
                type: SET_SELECTED_BUN,
                id: id
            });
        }
        else {
            dispatch({
                type: ADD_SELECTED_INGRIDIENT,
                id: id
            });
        }
    }

    

    function ingridientExists(id) {
        return getIngridientById(id) ? true : false;
    }
    function getIngridientById(id) {
        let result;
        result = ingridients.filter((ingridient) => ingridient._id === id)[0];

        return result;
    }

    return (
        <div className={styles.app}>
            {isModalOpened && (<Modal title={modalTitle} closeFunc={handleCloseModal}>
                {modalControl }
            </Modal>)}
            <AppHeader/>
            <main className={styles.main}>
                <div className={styles.burgerBlock}>
                    <BurgerIngredients />{/*handleOpenModal={handleOpenModal} */}
                    <BurgerConstructor />{/* handleOpenModal={handleOpenModal}*/}
                </div>
            </main>
        </div>
    );
}

export default App;