import styles from "./burger-constructor.module.css";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import ScrollingContainer from "../scrolling-container/scrolling-container";
import ingridientPropType from "../../utils/prop-types";
import { SET_MODAL_CONTENT, SET_MODAL_VIEW_STATE, ORDER_MODAL_TYPE, } from '../../services/actions/';

import { webApi } from "../app/app";

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const selectedIngridientsList = useSelector(store => store.selectedIngridients.collection);
    const bunData = useSelector(store => store.selectedIngridients.bunData);
    const totalPrice = useSelector(store => store.selectedIngridients.totalPrice);
    
    function getOrder() {
        const orderDetails = [bunData._id, ...selectedIngridientsList.map(x => x._id), bunData._id]
        return webApi.createOrder(orderDetails).then(res => openModal(res.order.number))
            .catch(e => {
                console.error("Failed to create order.")
            });
    }

    function openModal(data) {
        dispatch({
            type: SET_MODAL_CONTENT,
            popupType: ORDER_MODAL_TYPE,
            data: data,
            Title: ""
        });
        dispatch({
            type: SET_MODAL_VIEW_STATE,
            isOpened: true
        });
    }

    return (
        <div className={styles.constructorContainer}>
            {bunData &&
                <div className={styles.BunElement}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bunData.name} (низ)`}
                        price={bunData.price}
                        thumbnail={bunData.image_mobile}
                    /></div>
            }
            <div className={styles.ingridientsScroll}>
                <ScrollingContainer>
                    {selectedIngridientsList.map((elementData) => (<BurgerElement key={elementData.pos} data={elementData.data} />))}
                </ScrollingContainer>
            </div>
            {bunData&&
                <div className={styles.BunElement}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bunData.name} (низ)`}
                        price={bunData.price}
                        thumbnail={bunData.image_mobile}
                    />
                </div>
            }
            <div className={styles.constructorFinalBlock}>
                <div className={styles.constructorPriceBlock}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
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