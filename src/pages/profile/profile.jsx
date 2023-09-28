import styles from "./profile.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink, Navigate, useLocation } from "react-router-dom";

export function ProfilePage() {
  const user = useSelector((store) => store.user.user);
  const [value, setValue] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
  });

  const onPassChange = (e) => {
    setValue({ ...value, password: e.target.value });
  };
  const onMailChange = (e) => {
    setValue({ ...value, email: e.target.value });
  };
  const onNameChange = (e) => {
    setValue({ ...value, name: e.target.value });
  };

  const location = useLocation();
  const isActive = (linkPath) => {
    if (linkPath === location.pathname) {
      return true;
    }

    return false;
  };
  let botOffer = "изменить свои персональные данные";
  return (
    <div className={styles.profile}>
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <div
            className={styles.fieldsColumn + " " + styles.navColumn + " mr-15"}
          >
            <div className={styles.navGrid}>
              <NavLink
                to="/profile"
                className={
                  "text text_type_main-medium " +
                  (!isActive("/profile") ? styles.clearLink : styles.activeLink)
                }
              >
                Профиль
              </NavLink>
              <NavLink
                className={
                  "text text_type_main-medium " +
                  (!isActive("/profile/orders")
                    ? styles.clearLink
                    : styles.activeLink)
                }
              >
                История заказов
              </NavLink>
              <Link
                className={"text text_type_main-medium " + styles.clearLink}
              >
                Выход
              </Link>
            </div>
            <p
              className={
                "text text_type_main-default text_color_inactive mt-20 p-0 " +
                styles.emptyPadding
              }
            >
              В этом разделе вы можете
            </p>
            <p
              className={
                "text text_type_main-default text_color_inactive p-0 " +
                styles.emptyPadding
              }
            >
              {botOffer}
            </p>
          </div>
          <div className={styles.navGrid + " " + styles.bigGap}>
            <Input
              icon="EditIcon"
              placeholder="Имя"
              value={value.name}
              onChange={onNameChange}
            ></Input>
            <Input
              icon="EditIcon"
              placeholder="Логин"
              value={value.email}
              onChange={onMailChange}
            ></Input>
            <PasswordInput
              icon="EditIcon"
              value={value.password}
              onChange={onPassChange}
              placeholder="Пароль"
            ></PasswordInput>
          </div>
        </div>
      </main>
    </div>
  );
}
