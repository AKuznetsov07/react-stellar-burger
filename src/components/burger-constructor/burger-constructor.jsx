import styles from "./burger-constructor.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import ScrollingContainer from "../scrolling-container/scrolling-container";
import ingridientPropType from "../../utils/prop-types";
import { SET_MODAL_CONTENT, SET_MODAL_VIEW_STATE, ORDER_MODAL_TYPE, } from '../../services/actions/';

import { webApi } from "../app/app";

import { SET_TOTAL_PRICE } from '../../services/actions/';

const BurgerConstructor = () => {
    const [orderRequest, setOrdersRequest] = useState(false);

    const dispatch = useDispatch();

    const fullIngridientsList = useSelector(store => store.fullIngridients.collection);
    const selectedIngridientsList = useSelector(store => store.selectedIngridients.collection);
    const bunId = useSelector(store => store.selectedIngridients.bunId);
    const totalPrice = useSelector(store => store.selectedIngridients.totalPrice);
    const [burgerContentPrice, setBurgerContentPrice] = useState(0);
    const [bunData, setBunData] = useState();
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        setBunData(fullIngridientsList.filter((element) => element._id === bunId)[0]);
    }, [bunId, fullIngridientsList])
    

    useEffect(() => {
        for (let i = 0; i < selectedIngridientsList.length; i++) {
            var foundElement = fullIngridientsList.filter((element) => element._id === selectedIngridientsList[i]._id)[0];
            if (foundElement) {
                setBurgerContentPrice(burgerContentPrice+foundElement.price)
                setSelectedData([...selectedData, { pos: i, data: foundElement }])
            }
        }
    }, [selectedIngridientsList, fullIngridientsList])

    function getOrder() {
        const orderDetails = [bunId, ...selectedIngridientsList.map(x => x._id),  bunId]
        return webApi.createOrder(orderDetails, setOrdersRequest).then(res => openModal(res.order.number))
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

    useEffect(() => {
        let price = burgerContentPrice;
        if (bunData && bunData.price)
            price += 2 * (bunData.price);
        dispatch({
            type: SET_TOTAL_PRICE,
            newPrice: price
        });
    }, [bunData, burgerContentPrice, dispatch])

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
                    {selectedData.map((elementData) => (<BurgerElement key={elementData.pos} data={elementData.data} />))}
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