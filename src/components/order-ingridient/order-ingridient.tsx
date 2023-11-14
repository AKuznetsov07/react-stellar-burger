import styles from "./order-ingridient.module.css";
import React, { useEffect, useRef, useMemo, FunctionComponent } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//function OrderIngridient(props) {
//  const { ingridientImg, iconText, className, hasNoGap } = props;

//  let fullClassName = "";
//  if (className) {
//    fullClassName = `${styles.element} ${styles[className]}`;
//  } else {
//    fullClassName = `${styles.element}`;
//  }
//  if (!hasNoGap) {
//    fullClassName = `${fullClassName} ${styles.needGap}`;
//  }
//  return (
//    <div className={fullClassName}>
//      <img src={ingridientImg} className={styles.img} alt="miniature" />
//      {iconText && (
//        <div className={styles.coverText}>
//          <p className="text text_type_main-small">{iconText}</p>
//        </div>
//      )}
//    </div>
//  );
//}

//export default OrderIngridient;


//////
type TOrderIngridientProps = {
    ingridientImg?: string;
    iconText?: string|null;
    className?: string;
    hasNoGap?:boolean;
}/* & React.ButtonHTMLAttributes<HTMLButtonElement>*/;

export const OrderIngridient: FunctionComponent<TOrderIngridientProps> = ({ ingridientImg, iconText, className, hasNoGap, ...props }) => {
    //const { ingridientImg, iconText, className, hasNoGap } = props;

    let fullClassName = "";
    if (className) {
        fullClassName = `${styles.element} ${styles[className]}`;
    } else {
        fullClassName = `${styles.element}`;
    }
    if (!hasNoGap) {
        fullClassName = `${fullClassName} ${styles.needGap}`;
    }
    return (
        <div className={fullClassName}>
            <img src={ingridientImg} className={styles.img} alt="miniature" />
            {iconText && (
                <div className={styles.coverText}>
                    <p className="text text_type_main-small">{iconText}</p>
                </div>
            )}
        </div>
    );
}