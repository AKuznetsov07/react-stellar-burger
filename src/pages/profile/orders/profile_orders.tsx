import styles from "./profile_orders.module.css";
import { FunctionComponent, useEffect, useMemo } from "react";
//import { useSelector, useDispatch, } from "react-redux";
import { FeedElement } from "../../../components/feed-element/feed-element";
import { FeedList } from "../../../components/feed-list/feed-list";
import {
  wsOpenAuthConnection,
  wsCloseConnection,
} from "../../../services/actions/wsActions";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../../services/storage/hooks";
//export function ProfileOrdersControl() {
//    const dispatch = useDispatch();

//    useEffect(() => {
        
//        dispatch(wsOpenAuthConnection("/orders"));
//    return () => {
//      dispatch(wsCloseConnection());
//    };
//    }, [dispatch]);
//  let ordersList = useSelector((store) => store.wsReducer.orders);

//  const location = useLocation();

//  if (!ordersList) {
//    ordersList = [];
//  }
//  const ordersUIList = useMemo(
//    () =>
//      ordersList.map((elementData) => (
//        <FeedElement
//              key={elementData._id}
//          linkBase={location.pathname}
//          orderData={elementData}
//        />
//      )),
//    [ordersList],
//  );

//  const ordersUIListEmpty = ordersUIList.length === 0;
//  return (
//    <div className={styles.profileOrder}>
//      {!ordersUIListEmpty && <FeedList>{ordersUIList}</FeedList>}
//      {ordersUIListEmpty && (
//        <div className={styles.emptyItem}>
//          <p className="text text_type_main-medium">История отсутствует!</p>
//        </div>
//      )}
//    </div>
//  );
//}
/////
type TProfileOrdersControlProps = {
}/* & React.ButtonHTMLAttributes<HTMLButtonElement>*/;

export const ProfileOrdersControl: FunctionComponent<TProfileOrdersControlProps> = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(wsOpenAuthConnection("/orders"));
        return () => {
            dispatch(wsCloseConnection(1000, "End of session"));
        };
    }, [dispatch]);
    let ordersList = useSelector((store) => store.wsReducer.orders);

    const location = useLocation();

    if (!ordersList) {
        ordersList = [];
    }
    const ordersUIList = useMemo(
        () =>
            ordersList.map((elementData) => (
                <FeedElement
                    key={elementData._id}
                    linkBase={location.pathname}
                    orderData={elementData}
                />
            )),
        [ordersList],
    );

    const ordersUIListEmpty = ordersUIList.length === 0;
    return (
        <div className={styles.profileOrder}>
            {!ordersUIListEmpty && <FeedList>{ordersUIList}</FeedList>}
            {ordersUIListEmpty && (
                <div className={styles.emptyItem}>
                    <p className="text text_type_main-medium">История отсутствует!</p>
                </div>
            )}
        </div>
    );
}