import React, { FunctionComponent, useEffect, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./ingredient-element.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types";
import { useDrag } from "react-dnd";

import { v4 as uuidv4 } from "uuid";
import { SET_DRAG_STYLE_TYPE, setDragStyleTypeAction } from "../../services/actions/utils";
import { useDispatch, useSelector } from "../../services/storage/hooks";
import { insertSelectedIngredientAction, setSelectedBunAction } from "../../services/actions/selectedCollection";
import { TIngredientPropType, TSelectedIngredientPropType, TDragItemType } from "../../services/custom-types/custom-types";

//function IngredientElement(props) {
//  const dispatch = useDispatch();

//  const location = useLocation();

//  const elementData = props.elementData;
//    const insertType =
//        props.elementData.type === "bun"
//            ? addBun : addIngridient;
//      //: INSERT_SELECTED_INGREDIENT;

//  const [{ isDrag }, drag] = useDrag({
//    type: "test",
//    item: { elementData, actionType: insertType },
//    collect: (monitor) => ({
//      isDrag: monitor.isDragging(),
//    }),
//  });

//  useEffect(() => {
//    dispatch({
//      type: SET_DRAG_STYLE_TYPE,
//      isDragged: isDrag,
//    });
//  }, [dispatch, isDrag]);
//  const selectedIngredientsList = useSelector(
//    (store) => store.selectedIngredients.collection,
//  );
//  const bunData = useSelector((store) => store.selectedIngredients.bunData);

//  const [count, setCount] = useState(0);
//  useEffect(() => {
//    let newCounter = selectedIngredientsList.filter(
//      (x) => x?.data._id === elementData._id,
//    )?.length;

//    if (bunData) {
//      if (bunData._id === elementData._id) {
//        newCounter += 2;
//      }
//    }

//    setCount(newCounter !== 0 ? newCounter : null);
//  }, [elementData._id, selectedIngredientsList, bunData]);

//  return (
//    <Link
//      key={elementData._id}
//      to={`/ingredients/${elementData._id}`}
//      state={{ background: location }}
//      className={styles.link + " " + styles.clearLink}
//    >
//      <li className={styles.ingredientElement} ref={drag}>
//        <img src={elementData.image} alt={elementData.name} />
//        <div className={styles.ingredientPriceBlock}>
//          <p className="text text_type_main-medium">
//            {props.elementData.price}
//          </p>
//          <CurrencyIcon type="primary" />
//        </div>
//        <p className="text text_type_main-small">{props.elementData.name}</p>
//        {count && <Counter count={count} size="default" extraClass="m-1" />}
//      </li>
//    </Link>
//  );
//}
//export default IngredientElement;

//const IngredientElementPropTypes = PropTypes.shape({
//  item: ingredientPropType,
//  count: PropTypes.number,
//});

//IngredientElement.propTypes = {
//  data: IngredientElementPropTypes,
//};



////////
export type TIngredientElementProps = {
    elementData: TIngredientPropType;

}/* & React.ButtonHTMLAttributes<HTMLButtonElement>*/;

export const IngredientElement: FunctionComponent<TIngredientElementProps> = ({ elementData,...props }) => {
    const dispatch = useDispatch();

    const location = useLocation();

    const insertType = elementData.type === "bun" ? setSelectedBunAction : insertSelectedIngredientAction;
    //item: {
    //    dragItem: {
    //        oldPos: elementModel.pos,
    //            data: elementModel.item,
    //        },
    //    actionType: updatePositionAction,
    //    },
    const [{ isDrag }, drag] = useDrag/*<TDragItemType, unknown, unknown>*/({
        type: "test",
        item: {
            //elementData,
            dragItem: {
                oldPos: null,
                data: {
                    ...elementData,
                    uniqueId: uuidv4()
                }
                },
            actionType: insertType
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        dispatch(setDragStyleTypeAction(isDrag))
        //dispatch({
        //    type: SET_DRAG_STYLE_TYPE,
        //    isDragged: isDrag,
        //});
    }, [dispatch, isDrag]);
    const selectedIngredientsList: Array<TSelectedIngredientPropType> = useSelector(
        (store) => store.selectedIngredients.collection,
    );
    const bunData = useSelector((store) => store.selectedIngredients.bunData);

    const [count, setCount] = useState<number|null>(0);
    useEffect(() => {
        let newCounter = selectedIngredientsList.filter(
            (x) => x?.item._id === elementData._id,
        )?.length;

        if (bunData) {
            if (bunData._id === elementData._id) {
                newCounter += 2;
            }
        }

        setCount(newCounter !== 0 ? newCounter : null);
    }, [elementData._id, selectedIngredientsList, bunData]);

    return (
        <Link
            key={elementData._id}
            to={`/ingredients/${elementData._id}`}
            state={{ background: location }}
            className={styles.link + " " + styles.clearLink}
        >
            <li className={styles.ingredientElement} ref={drag}>
                <img src={elementData.image} alt={elementData.name} />
                <div className={styles.ingredientPriceBlock}>
                    <p className="text text_type_main-medium">
                        {elementData.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-small">{elementData.name}</p>
                {count && <Counter count={count} size="default" extraClass="m-1" />}
            </li>
        </Link>
    );
}