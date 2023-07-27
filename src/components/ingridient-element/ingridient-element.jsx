import React from 'react';
import styles from "./ingridient-element.module.css";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import ingridientPropType from "../../utils/prop-types";

const IngridientElement = ({ elementData,count }) => {
    const image = (
        <img
            src={elementData.image}
            alt={elementData.name}
        />
    );
    
    return (
        <li className={styles.ingridientElement}>
            {image}
            <div className={styles.ingridientPriceBlock}>
                <p className="text text_type_main-medium">{elementData.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small" >{elementData.name}</p>
            {count && <Counter count={0} size="default" extraClass="m-1" />}
            
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