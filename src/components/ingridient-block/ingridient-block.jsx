import React from 'react';
import styles from "./ingridient-block.module.css";
import PropTypes from "prop-types";
import ingridientPropType from "../../utils/prop-types";

const ingridientBlock = props => WrappedComponent => class extends React.Component {

    render() {
        
        const elements = props.data.filter((element) => element.type === props.elementType);
        return (
            <div className={styles.ingridientBlockWrapper}>
                <p className="text text_type_main-medium">{props.Title}</p>
                <section className={styles.ingridientBlock}>
                    {elements.map((element) => <WrappedComponent key={element._id} elementData={element} />)}
                </section>
            </div>
        );
    }
}

export default ingridientBlock;

ingridientBlock.propTypes = {
    Title: PropTypes.string,
    elementType: PropTypes.string,
    data: ingridientPropType,
};