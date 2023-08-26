import styles from "./burger-constructor.module.css";
import React, { useContext } from "react";
import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import ScrollingContainer from "../scrolling-container/scrolling-container";
import ingridientPropType from "../../utils/prop-types";
import { SET_MODAL_CONTENT, SET_MODAL_VIEW_STATE, ORDER_MODAL_TYPE, } from '../../services/actions/';
import { SelectedCollectionContext, ModalContext } from '../../services/appContext';

import { webApi } from "../app/app";

const BurgerConstructor = () => {
    const { selectedIngridients } = useContext(SelectedCollectionContext);
    const { modalStateDispatcher } = useContext(ModalContext);

    function getOrder() {
        const orderDetails = [selectedIngridients.bunData._id, ...selectedIngridients.collection.map(x => x._id), selectedIngridients.bunData._id]
        return webApi.createOrder(orderDetails).then(res => openModal(res.order.number))
            .catch(e => {
                console.error("Failed to create order.")
            });
    }

    function openModal(data) {
        modalStateDispatcher({
            type: SET_MODAL_CONTENT,
            popupType: ORDER_MODAL_TYPE,
            data: data,
            Title: ""
        });
        modalStateDispatcher({
            type: SET_MODAL_VIEW_STATE,
            isOpened: true
        });
    }

    return (
        <div className={styles.constructorContainer}>
            {selectedIngridients.bunData &&
                <div className={styles.BunElement}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${selectedIngridients.bunData.name} (низ)`}
                        price={selectedIngridients.bunData.price}
                        thumbnail={selectedIngridients.bunData.image_mobile}
                    /></div>
            }
            <div className={styles.ingridientsScroll}>
                <ScrollingContainer>
                    {selectedIngridients.collection.map((elementData) => (<BurgerElement key={elementData.pos} data={elementData.data} />))}
                </ScrollingContainer>
            </div>
            {selectedIngridients.bunData &&
                <div className={styles.BunElement}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${selectedIngridients.bunData.name} (низ)`}
                        price={selectedIngridients.bunData.price}
                        thumbnail={selectedIngridients.bunData.image_mobile}
                    />
                </div>
            }
            <div className={styles.constructorFinalBlock}>
                <div className={styles.constructorPriceBlock}>
                    <p className="text text_type_digits-medium">{selectedIngridients.totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={getOrder}>Оформить заказ</Button>
            </div>
        </div>
    );
}

const BurgerElement = (props) => {
    return (
        <div className={styles.BurgerElement}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={props.data.name}
                price={props.data.price}
                thumbnail={props.data.image_mobile}
            />
        </div>
    );
}

export default BurgerConstructor;

BurgerElement.propTypes = {
    data: ingridientPropType
};