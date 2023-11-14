import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FunctionComponent, useEffect, useRef } from "react";
import styles from "./burger-element.module.css";
//import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  REMOVE_SELECTED_ITEM,
  SET_INSERT_POSITION,
    removeSelectedItemAction,
    setInsertPositionAction,
    updatePositionAction
} from "../../services/actions/selectedCollection";
import { useDispatch } from "../../services/storage/hooks";
import { TSelectedIngredientPropType, TDragItemType } from "../../services/custom-types/custom-types";

//export const BurgerElement = (props) => {
//  const ref = useRef(null);
//  const dispatch = useDispatch();
//  const [{ isDrag }, drag] = useDrag({
//    type: "test",
//    item: {
//      elementData: {
//        oldPos: props.elementModel.pos,
//        data: props.elementModel.data,
//      },
//        actionType: moveIngridient,
//    },
//    collect: (monitor) => ({
//      isDrag: monitor.isDragging(),
//    }),
//  });

//  const [{ isHover }, drop] = useDrop({
//    accept: "test",
//    collect(monitor) {
//      return {
//        isHover: monitor.isOver(),
//      };
//    },
//  });

//  useEffect(() => {
//    if (isHover) {
//      dispatch({
//        type: SET_INSERT_POSITION,
//        newPos: props.elementModel.pos,
//      });
//    }
//  }, [isHover]);

//  drag(drop(ref));

//  function RemoveHandler() {
//    dispatch({
//      type: REMOVE_SELECTED_ITEM,
//      pos: props.elementModel.pos,
//    });
//  }
//  return (
//    !isDrag && (
//      <div className={styles.BurgerElement} ref={ref}>
//        <DragIcon type="primary" />
//        <ConstructorElement
//          text={props.elementModel.data.name}
//          price={props.elementModel.data.price}
//          thumbnail={props.elementModel.data.image_mobile}
//          handleClose={RemoveHandler}
//        />
//      </div>
//    )
//  );
//};

//BurgerElement.propTypes = {
//  data: ingredientPropType,
//};

////
type TBurgerElementProps = {
    elementModel: TSelectedIngredientPropType;//{ pos: number, data: TIngredientPropType };
} /* & React.ButtonHTMLAttributes<HTMLButtonElement>*/;
export const BurgerElement: FunctionComponent<TBurgerElementProps> = ({ elementModel, ...props}) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    //console.log("BurgerElement")
    //console.log(elementModel)
    //const newDragItem: TDragItemType = {
    //    dragItem: {
    //        oldPos: elementModel.pos,
    //        data: elementModel.item,
    //    },
    //    actionType: updatePositionAction,
    //}
    //console.log("newDragItem")
    //console.log(newDragItem)
    const [{ isDrag }, drag] = useDrag/*<TDragItemType, unknown, unknown>*/({
        type: "test",
        //item: newDragItem,
        item: {
            dragItem: {
                oldPos: elementModel.pos,
                data: elementModel.item,
            },
            actionType: updatePositionAction,
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const [{ isHover }, drop] = useDrop({
        accept: "test",
        collect(monitor) {
            return {
                isHover: monitor.isOver(),
            };
        },
    });

    useEffect(() => {
        if (isHover) {
            dispatch(setInsertPositionAction(elementModel.pos))
            //dispatch({
            //    type: SET_INSERT_POSITION,
            //    newPos: elementModel.pos,
            //});
        }
    }, [isHover]);

    drag(drop(ref));

    function RemoveHandler() {
        dispatch(removeSelectedItemAction(elementModel.pos))
        //dispatch({
        //    type: REMOVE_SELECTED_ITEM,
        //    pos: elementModel.pos,
        //});
    }
    return (
        <>
            {
                !isDrag && (
                    <div className={styles.BurgerElement} ref={ref}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={elementModel.item.name}
                            price={elementModel.item.price}
                            thumbnail={elementModel.item.image_mobile}
                            handleClose={RemoveHandler}
                        />
                    </div>
                )
            }
        </>
    );
}