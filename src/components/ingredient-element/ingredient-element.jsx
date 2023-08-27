import React, { useEffect, useState, useContext } from "react";
import styles from "./ingredient-element.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types";
import {
  SET_MODAL_CONTENT,
  SET_MODAL_VIEW_STATE,
  INGRIDIENT_MODAL_TYPE,
} from "../../services/actions/";
import {
  SelectedCollectionContext,
  ModalContext,
} from "../../services/appContext";

function IngredientElement(props) {
  const elementData = props.elementData;
  const { selectedIngredients } = useContext(SelectedCollectionContext);
  const { modalStateDispatcher } = useContext(ModalContext);

  const [count, setCount] = useState(0);
  useEffect(() => {
    let newCounter = selectedIngredients.collection.filter(
      (x) => x?.data._id === elementData._id,
    )?.length;

    if (selectedIngredients.bunData) {
      if (selectedIngredients.bunData._id === elementData._id) {
        newCounter += 2;
      }
    }

    setCount(newCounter !== 0 ? newCounter : null);
  }, [elementData._id, selectedIngredients]);

  function openModal() {
    modalStateDispatcher({
      type: SET_MODAL_CONTENT,
      popupType: INGRIDIENT_MODAL_TYPE,
      data: elementData,
      Title: "Детали ингредиента",
    });
    modalStateDispatcher({
      type: SET_MODAL_VIEW_STATE,
      isOpened: true,
    });
  }

  return (
    <li className={styles.ingredientElement} onClick={openModal}>
      <img src={elementData.image} alt={elementData.name} />
      <div className={styles.ingredientPriceBlock}>
        <p className="text text_type_main-medium">{props.elementData.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{props.elementData.name}</p>
      {count && <Counter count={count} size="default" extraClass="m-1" />}
    </li>
  );
}
export default IngredientElement;

const IngredientElementPropTypes = PropTypes.shape({
  item: ingredientPropType,
  count: PropTypes.number,
});

IngredientElement.propTypes = {
  data: IngredientElementPropTypes,
};
