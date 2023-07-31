import React from 'react';
import styles from "./ingridient-block.module.css";
import PropTypes from "prop-types";
import ingridientPropType from "../../utils/prop-types";
import IngridientInfo from "../ingridient-info/ingridient-info";

function ingridientBlock(props) {
    const WrappedComponent=props.wrappedNode
    const elements = props.data.filter((element) => element.type === props.elementType);
    return (
        <div className={styles.ingridientBlockWrapper}>
            <p className="text text_type_main-medium">{props.Title}</p>
            <section className={styles.ingridientBlock}>
                {elements.map((element) => <WrappedComponent key={element._id} elementData={element} onClick={() => { props.clickHandler(< IngridientInfo ingridientData={element} />,"Детали ингредиента") }} />)}
            </section>
        </div>
    );
}

export default ingridientBlock;

ingridientBlock.propTypes = {
    Title: PropTypes.string,
    elementType: PropTypes.string,
    data: PropTypes.arrayOf(ingridientPropType),
    clickHandler: PropTypes.func,
    wrappedNode: PropTypes.node
};