import React from "react";
import styles from "./app-header.module.css";
import { Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <nav className={styles.appHeaderContent}>
              <div className={styles.appHeaderItemBlock}>
                  <Link className={styles.appHeaderItem} to='/'>
                      <BurgerIcon type="primary" />
                      <p className="text text_type_main-default text_color_inactive">
                          Конструктор
                      </p>
                  </Link>
          {/*<a className={styles.appHeaderItem} href="#">*/}
                  {/*</a>*/}
                  <Link to='/' className={styles.appHeaderItem}>
                      <ListIcon type="secondary" />
                      <p className="text text_type_main-default text_color_inactive">
                          Лента заказов
                      </p>
                  </Link>
          {/*<a className={styles.appHeaderItem} href="#">*/}
          {/*</a>*/}
        </div>
              <Logo className={styles.logo} />
              <Link className={styles.reversedItem} to='/profile'>
                  <ProfileIcon type="secondary" />
                  <p className="text text_type_main-default text_color_inactive">
                      Личный кабинет
                  </p>
              </Link>
        {/*<a className={styles.reversedItem} href="#">*/}
        {/*</a>*/}
      </nav>
    </header>
  );
}

export default AppHeader;
