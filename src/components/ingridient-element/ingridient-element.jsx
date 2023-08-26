import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from "./ingridient-element.module.css";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import ingridientPropType from "../../utils/prop-types";
import { SET_MODAL_CONTENT, SET_MODAL_VIEW_STATE, INGRIDIENT_MODAL_TYPE } from '../../services/actions/';

function IngridientElement(props) {

    const dispatch = useDispatch();
    const elementData = props.elementData;

    const selectedIngridientsList = useSelector(store => store.selectedIngridients.collection);
    const selectedBunId = useSelector(store => store.selectedIngridients.bunId);

    const [Count, setCount] = useState(0);
    useEffect(() => {
        const newCount = [...selectedIngridientsList, { _id: selectedBunId }, { _id: selectedBunId }].filter(x => x._id === elementData._id).length;
        setCount(newCount !== 0 ? newCount:null);
    }, [selectedIngridientsList, selectedBunId])

    function openModal() {
        dispatch({
            type: SET_MODAL_CONTENT,
            popupType: INGRIDIENT_MODAL_TYPE,
            data: elementData,
            Title: "Детали ингредиента"
        });
        dispatch({
            type: SET_MODAL_VIEW_STATE,
            isOpened: true
        });
    }

    return (
        <li className={styles.ingridientElement} onClick={openModal}>
            <img
                src={elementData.image}
                alt={elementData.name}
            />
            <div className={styles.ingridientPriceBlock}>
                <p className="text text_type_main-medium">{props.elementData.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small" >{props.elementData.name}</p>
            {Count && <Counter count={Count} size="default" extraClass="m-1" />}
            
        </li>
    );
};
export default IngridientElement;


const IngridientElementPropTypes = PropTypes.shape({
    item: ingridientPropType,
    count: PropTypes.number,
});

IngridientElement.propTypes = {
    data: IngridientElementPropTypes
};