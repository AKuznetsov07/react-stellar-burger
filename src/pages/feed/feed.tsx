import styles from "./feed.module.css";
import { FeedList } from "../../components/feed-list/feed-list";
import { ScrollingContainer } from "../../components/scrolling-container/scrolling-container";
import React, { FunctionComponent } from "react";
import { useEffect, useMemo } from "react";
import { FeedElement } from "../../components/feed-element/feed-element";
import {
  wsOpenConnection,
  wsCloseConnection,
} from "../../services/actions/wsActions";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/storage/hooks";
import { TOrderPropType } from "../../services/custom-types/custom-types";


export const FeedPage: FunctionComponent = () => {
    const dispatch = useDispatch();
    const total = useSelector((store) => store.wsReducer.total);
    const totalToday = useSelector((store) => store.wsReducer.totalToday);
    const ordersList = useSelector((store) => store.wsReducer.orders);
    const [finishedOrders, setFinishedOrders] = React.useState<Array<TOrderPropType>>([]);
    const [progressOrders, setProgressOrders] = React.useState<Array<TOrderPropType>>([]);

    const location = useLocation();

    useEffect(() => {
        dispatch(wsOpenConnection("/orders/all"));
        return () => {
            dispatch(wsCloseConnection(1000,"End of session"));
        };
    }, [dispatch]);

    const ordersUIList = useMemo(
        () =>
            ordersList.map((elementData) => (
                <FeedElement
                    linkBase={location.pathname}
                    key={elementData._id}
                    orderData={elementData}
                />
            )),
        [ordersList],
    );

    useEffect(() => {
        const finished: Array<TOrderPropType> = ordersList.filter((x) => x.status === "done");
        const ordered: Array<TOrderPropType> = ordersList.filter((x) => x.status !== "done");
        setFinishedOrders(finished);
        setProgressOrders(ordered);
    }, [ordersList]);

    return (
        <div className={styles.feed}>
            <main className={styles.main}>
                <div className={styles.headerBlock}>
                    <p className="text text_type_main-large">Лента заказов</p>
                </div>
                <div className={styles.centralBlock}>
                    <div className={styles.FeedListBlock}>
                        <FeedList>{ordersUIList}</FeedList>
                    </div>
                    <section className={styles.statSection}>
                        <div className={styles.numbersListsBlocks}>
                            <div className={styles.numbersListBlock}>
                                <p className="text text_type_main-medium">Готовы:</p>
                                <ScrollingContainer>
                                    <div className={styles.numbersList}>
                                        {finishedOrders.map((elementData) => (
                                            <p
                                                className={`text text_type_digits-default ${styles.cyanTextColor}`}
                                                key={elementData._id}
                                            >
                                                {elementData.number}
                                            </p>
                                        ))}
                                    </div>
                                </ScrollingContainer>
                            </div>
                            <div className={styles.numbersListBlock}>
                                <p className="text text_type_main-medium">В работе:</p>
                                <ScrollingContainer>
                                    <div className={styles.numbersList}>
                                        {progressOrders.map((elementData) => (
                                            <p
                                                className="text text_type_digits-default"
                                                key={elementData._id}
                                            >
                                                {elementData.number}
                                            </p>
                                        ))}
                                    </div>
                                </ScrollingContainer>
                            </div>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">
                                Выполнено за все время:
                            </p>
                            <p className="text text_type_digits-large">{total}</p>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">
                                Выполнено за сегодня:
                            </p>
                            <p className="text text_type_digits-large">{totalToday}</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}