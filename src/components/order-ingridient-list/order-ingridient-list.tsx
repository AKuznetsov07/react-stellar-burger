import styles from "./order-ingridient-list.module.css";
import React, { FunctionComponent } from "react";

//const OrderIngridientsList = (props) => {
//  const { orderData } = props;

//  return <ul className={styles.list}>{props.children}</ul>;
//};
//export default OrderIngridientsList;


//////
type TOrderIngridientsListProps = {
}/* & React.ButtonHTMLAttributes<HTMLButtonElement>*/;

export const OrderIngridientsList: FunctionComponent<TOrderIngridientsListProps> = ({ ...props }) => {
    return <ul className={styles.list}>{props.children}</ul>;
}