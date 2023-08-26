import React, { useMemo, useContext } from "react";
import styles from "./ingridient-block.module.css";
import PropTypes from "prop-types";
import { FullCollectionContext } from '../../services/appContext';

function IngridientBlock(props) {
    const { fullCollection } = useContext(FullCollectionContext);
    const WrappedComponent=props.wrappedNode
    const elements = useMemo(() => fullCollection.collection.filter((element) => element.type === props.elementType), [fullCollection, props.elementType]);

    return (
        elements  &&<div className={styles.ingridientBlockWrapper}>
            <p className="text text_type_main-medium">{props.Title}</p>
            <section className={styles.ingridientBlock}>
                {elements.map((element) => <WrappedComponent key={element._id} elementData={element}  />)}
            </section>
        </div>
    );
}

export default IngridientBlock;

IngridientBlock.propTypes = {
    elementType: PropTypes.string,
    wrappedNode: PropTypes.node
};