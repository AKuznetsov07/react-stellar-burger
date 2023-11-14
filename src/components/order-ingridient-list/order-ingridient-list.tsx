import styles from "./order-ingridient-list.module.css";
import React, { FunctionComponent } from "react";

type TOrderIngridientsListProps = {
};

export const OrderIngridientsList: FunctionComponent<TOrderIngridientsListProps> = ({ ...props }) => {
    return <ul className={styles.list}>{props.children}</ul>;
}