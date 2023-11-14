import { FunctionComponent } from "react";
import styles from "./centred-control.module.css";

type TCentredControlProps = {
};

export const CentredControl: FunctionComponent<TCentredControlProps> = ({ children, ...props }) => {
    return (
        <div className={styles.Container}>{children}</div>
    );
}