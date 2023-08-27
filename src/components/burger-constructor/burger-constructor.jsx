import styles from "./burger-constructor.module.css";
import React, { useContext } from "react";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollingContainer from "../scrolling-container/scrolling-container";
import {
  SET_MODAL_CONTENT,
  SET_MODAL_VIEW_STATE,
  ORDER_MODAL_TYPE,
} from "../../services/actions/";
import {
  SelectedCollectionContext,
  ModalContext,
} from "../../services/appContext";
import { BurgerElement } from "../burger-element/burger-element";

import { webApi } from "../app/app";

const BurgerConstructor = () => {
  const { selectedIngredients } = useContext(SelectedCollectionContext);
  const { modalStateDispatcher } = useContext(ModalContext);

  function getOrder() {
    const orderDetails = [
      selectedIngredients.bunData._id,
      ...selectedIngredients.collection.map((x) => x._id),
      selectedIngredients.bunData._id,
    ];
    return webApi
      .createOrder(orderDetails)
      .then((res) => openModal(res.order.number))
      .catch((e) => {
        console.error("Failed to create order.");
      });
  }

  function openModal(data) {
    modalStateDispatcher({
      type: SET_MODAL_CONTENT,
      popupType: ORDER_MODAL_TYPE,
      data: data,
      Title: "",
    });
    modalStateDispatcher({
      type: SET_MODAL_VIEW_STATE,
      isOpened: true,
    });
  }

  return (
    <div className={styles.constructorContainer}>
      {selectedIngredients.bunData && (
        <div className={styles.BunElement}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedIngredients.bunData.name} (низ)`}
            price={selectedIngredients.bunData.price}
            thumbnail={selectedIngredients.bunData.image_mobile}
          />
        </div>
      )}
      <div className={styles.ingredientsScroll}>
        <ScrollingContainer>
          {selectedIngredients.collection.map((elementData) => (
            <BurgerElement key={elementData.pos} data={elementData.data} />
          ))}
        </ScrollingContainer>
      </div>
      {selectedIngredients.bunData && (
        <div className={styles.BunElement}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedIngredients.bunData.name} (низ)`}
            price={selectedIngredients.bunData.price}
            thumbnail={selectedIngredients.bunData.image_mobile}
          />
        </div>
      )}
      <div className={styles.constructorFinalBlock}>
        <div className={styles.constructorPriceBlock}>
          <p className="text text_type_digits-medium">
            {selectedIngredients.totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={getOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
