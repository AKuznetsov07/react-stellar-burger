import React from "react";
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


function AppHeader() {
    return (
        <header className={styles.appHeader}>
            <nav className={styles.appHeaderContent}>
                <div className={styles.appHeaderItemBlock}>
                    <div className={styles.appHeaderItem}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default text_color_inactive">Конструктор</p>
                    </div>
                    <div className={styles.appHeaderItem}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                    </div>
                </div>
                <Logo className={styles.logo} />
                <div className={styles.reversedItem}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;