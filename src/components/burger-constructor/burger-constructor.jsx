import styles from "./burger-constructor.module.css";
import React, { useContext, useEffect } from "react";
import { useDrop } from "react-dnd";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollingContainer from "../scrolling-container/scrolling-container";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_MODAL_CONTENT,
  SET_MODAL_VIEW_STATE,
  ORDER_MODAL_TYPE,
  CLEAR_SELECTION,
} from "../../services/actions/";

import { BurgerElement } from "../burger-element/burger-element";

import { webApi } from "../app/app";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const [canOrder, setCanOrder] = React.useState(false);
  const isDragging = useSelector((store) => store.utils.isDragged);
  const selectedIngredientsList = useSelector(
    (store) => store.selectedIngredients.collection,
  );
  const bunData = useSelector((store) => store.selectedIngredients.bunData);
  const totalPrice = useSelector(
    (store) => store.selectedIngredients.totalPrice,
  );

  useEffect(() => {
    if (bunData || selectedIngredientsList.length > 0) {
      setCanOrder(true);
    } else {
      setCanOrder(false);
    }
  }, [selectedIngredientsList, bunData]);
  const [, drop] = useDrop({
    accept: "test",
    collect: (monitor) => ({}),
    drop(item) {
      dispatch({
        type: item.actionType,
        data: item.elementData,
      });
    },
  });

  function getOrder() {
    const orderDetails = [
      bunData._id,
      ...selectedIngredientsList.map((x) => x._id),
      bunData._id,
    ];
    return webApi
      .createOrder(orderDetails)
      .then((res) => openModal(res.order.number))
      .then(clearOrder)
      .catch((e) => {
        console.error("Failed to create order.");
      });
  }
  function clearOrder() {
    dispatch({
      type: CLEAR_SELECTION,
    });
  }
  function openModal(data) {
    dispatch({
      type: SET_MODAL_CONTENT,
      popupType: ORDER_MODAL_TYPE,
      data: data,
      Title: "",
    });
    dispatch({
      type: SET_MODAL_VIEW_STATE,
      isOpened: true,
    });
  }
  return (
    <div className={styles.constructorContainer} ref={drop}>
      {bunData && (
        <div className={styles.BunElement}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunData.name} (низ)`}
            price={bunData.price}
            thumbnail={bunData.image_mobile}
          />
        </div>
      )}
      <div
        className={`${styles.ingredientsScroll} ${
          isDragging ? styles.draggingBorder : ""
        }`}
      >
        <ScrollingContainer>
          {selectedIngredientsList.map((elementData) => (
            <BurgerElement key={elementData.pos} elementModel={elementData} />
          ))}
        </ScrollingContainer>
      </div>
      {bunData && (
        <div className={styles.BunElement}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunData.name} (низ)`}
            price={bunData.price}
            thumbnail={bunData.image_mobile}
          />
        </div>
      )}
      <div className={styles.constructorFinalBlock}>
        <div className={styles.constructorPriceBlock}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={getOrder}
          disabled={!canOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
