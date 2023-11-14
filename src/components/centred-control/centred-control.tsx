import { FunctionComponent } from "react";
import styles from "./centred-control.module.css";
//const CentredControl = (props) => {
//  return <div className={styles.Container}>{props.children}</div>;
//};
//export default CentredControl;

/////
type TCentredControlProps = {
}/* & React.ButtonHTMLAttributes<HTMLButtonElement>*/;

export const CentredControl: FunctionComponent<TCentredControlProps> = ({ children, ...props }) => {
    return (
        <div className={styles.Container}>{children}</div>
    );
}