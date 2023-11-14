import { FunctionComponent } from "react";
import styles from "./scrolling-container.module.css";
//const ScrollingContainer = (props) => {
//  let fullClassName = "";
//  if (props.className) {
//    fullClassName = `${styles.scrollingContainer} ${styles[props.className]}`;
//  } else {
//    fullClassName = `${styles.scrollingContainer}`;
//  }
//  return (
//    <div className={styles.scrollWrapper}>
//      <ul className={`${fullClassName} custom-scroll`}>{props.children}</ul>
//    </div>
//  );
//};
//export default ScrollingContainer;



//////
type TScrollingContainerProps = {
    className?:string;
}/* & React.ButtonHTMLAttributes<HTMLButtonElement>*/;

export const ScrollingContainer: FunctionComponent<TScrollingContainerProps> = ({ className, children, ...props }) => {
    let fullClassName = "";
    if (className) {
        fullClassName = `${styles.scrollingContainer} ${styles[className]}`;
    } else {
        fullClassName = `${styles.scrollingContainer}`;
    }
    return (
        <div className={styles.scrollWrapper}>
            <ul className={`${fullClassName} custom-scroll`}>{children}</ul>
        </div>
    );
}