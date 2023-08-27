import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-element.module.css";
import ingredientPropType from "../../utils/prop-types";

export const BurgerElement = (props) => {
  return (
    <div className={styles.BurgerElement}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.data.name}
        price={props.data.price}
        thumbnail={props.data.image_mobile}
      />
    </div>
  );
};

BurgerElement.propTypes = {
  data: ingredientPropType,
};
