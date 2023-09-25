import styles from "./profile.module.css";
import AppHeader from "../../components/app-header/app-header";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
//import BurgerConstructor from "../components/burger-constructor/burger-constructor";
//import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
//import Modal from "../components/modal/modal";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
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
                        <p className="pt-20">324</p>
                    </div>
                    <div className={styles.fieldsColumn}>
                        <Input placeholder="Имя" extraClass="pt-6"></Input>
                        <Input placeholder="Логин" extraClass="pt-6"></Input>
                        <PasswordInput placeholder="Пароль" extraClass="pt-6"></PasswordInput>
                    </div>
                </form>
            </main>
        </div>
    );
}