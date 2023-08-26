import { useSelector } from 'react-redux';
import styles from "./ingridient-block.module.css";
import PropTypes from "prop-types";
import ingridientPropType from "../../utils/prop-types";
import IngridientDetails from "../ingridient-info/ingridient-info";

function IngridientBlock(props) {
    const fullIngridientsList = useSelector(store => store.fullIngridients.collection);
    const WrappedComponent=props.wrappedNode
    const elements = fullIngridientsList.filter((element) => element.type === props.elementType);
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