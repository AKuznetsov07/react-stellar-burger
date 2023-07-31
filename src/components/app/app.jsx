import styles from "./app.module.css";
//import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ModalContainer from "../modal/modal";
import React, { useEffect, useState } from "react";
import { Api } from '../api/Api.js';
import { apiConfig } from "../../utils/constants";


const SelectedIngridients = [{ _id: '643d69a5c3f7b9001cfa093c', pos: 2 }, { _id: '643d69a5c3f7b9001cfa093e', pos: 3 }, { _id: '643d69a5c3f7b9001cfa093e', pos: 1 },
    { _id: '643d69a5c3f7b9001cfa0944', pos: 6 }, { _id: '643d69a5c3f7b9001cfa0944', pos: 4 }, { _id: '643d69a5c3f7b9001cfa0947', pos: 5 }]
let BunId = '643d69a5c3f7b9001cfa093c';




function App() {

    const webApi = new Api(apiConfig);
    const [ingridients, setIngridients] = useState([]);
    const [selectedIngridients, setSelectedIngridients] = useState(SelectedIngridients);
    const [modalFormContent, setModalFormContent] = useState({
        Title: "",
        Node:null
    });

    const [isModalVisible, setModalVisibility] = useState(false);


    function GetData() {
        webApi.getIngridients()
            .then(newData => {
                setIngridients(newData.data);
            })
            .catch(e => {
                throw new Error("Failed to load ingridients data.")
            })
            .finally(() => { });
    }
    function GetOrder(orderDetails) {
        return webApi.createOrder(orderDetails)
            .catch(e => {
                throw new Error("Failed to create order.")
            })
            .finally(() => { });
    }

    useEffect(() => {
        const getSmth = async () => {
            GetData();
        };
        getSmth();
    }, [])


    function OpenModal(node, title) {
        setModalVisibility(true);
        setModalFormContent({
            Title: title,
            Node: node
        })
    }

    function CloseModal(node) {
        setModalVisibility(false);
    }
    const handleOpenModal = (node, title) => OpenModal(node, title);
    const handleCloseModal = (node) => CloseModal(node);


    return (
        <div className={styles.app}>
            {isModalVisible && (<ModalContainer title={modalFormContent.Title} closeFunc={handleCloseModal}>
                {modalFormContent.Node }
            </ModalContainer>)}
            <AppHeader/>
            <main className={styles.main}>
                <div className={styles.burgerBlock}>
                    <BurgerIngredients ingridients={ingridients} handleOpenModal={handleOpenModal} />
                    <BurgerConstructor fullIngridients={ingridients} selectedIngridients={selectedIngridients} bunId={BunId}
                        handleOpenModal={handleOpenModal} createOrderFunc={(orderData) => GetOrder(orderData)} />
                </div>
            </main>
            
        </div>
    );
}

export default App;