import styles from "./profile.module.css";
import AppHeader from "../../components/app-header/app-header";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
//import BurgerConstructor from "../components/burger-constructor/burger-constructor";
//import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
//import Modal from "../components/modal/modal";
import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from 'react-router-dom';
//import { DndProvider } from "react-dnd";
//import { HTML5Backend } from "react-dnd-html5-backend";
//import { useDispatch, useSelector } from "react-redux";
//import { getData } from "../services/actions/fullCollection";
//import { SET_MODAL_VIEW_STATE } from "../services/actions/modal";

export function ProfilePage() {
    return (
        <div className={styles.profile}>
            <main className={styles.main}>
                <form className={styles.profileForm}>
                    <div className={styles.fieldsColumn}>
                        <div className={styles.fieldsColumn}>
                            <Link to='/profile' className="text text_type_main-large">Профиль</Link>
                            <Link className="text text_type_main-large">История заказов</Link>
                            <Link className="text text_type_main-large">Выход</Link>
                        </div>
                        <span className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</span>
                    </div>
                    {/*<Outlet/>*/}
                    <div className={styles.fieldsColumn}>
                        <Input icon="EditIcon" placeholder="Имя" extraClass="pt-6"></Input>
                        <Input icon="EditIcon" placeholder="Логин" extraClass="pt-6"></Input>
                        <PasswordInput icon="EditIcon" placeholder="Пароль" extraClass="pt-6"></PasswordInput>
                    </div>
                </form>
            </main>
        </div>
    );
}