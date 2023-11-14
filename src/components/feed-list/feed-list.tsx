import styles from "./feed-list.module.css";
import React, { FunctionComponent } from "react";
import { ScrollingContainer } from "../scrolling-container/scrolling-container";

//function FeedList(props) {
//  return (
//    <div className={styles.feedList}>
//      <div className={styles.orderList}>
//        <ScrollingContainer className="gap4">
//          {props.children}
//        </ScrollingContainer>
//      </div>
//    </div>
//  );
//}

//export default FeedList;

////////

type TFeedListProps = {
}/* & React.ButtonHTMLAttributes<HTMLButtonElement>*/;

export const FeedList: FunctionComponent<TFeedListProps> = ({ ...props }) => {

    //const { primary, secondary, children, ...props } = this.props;
    return (
        <div className={styles.feedList}>
            <div className={styles.orderList}>
                <ScrollingContainer className="gap4">
                    {props.children}
                </ScrollingContainer>
            </div>
        </div>
    );
}