import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";
import styles from "./forgot-password.module.css";
//import BurgerConstructor from "../components/burger-constructor/burger-constructor";
//import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
//import Modal from "../components/modal/modal";
import React from "react";
import { Link } from 'react-router-dom';
//import { DndProvider } from "react-dnd";
//import { HTML5Backend } from "react-dnd-html5-backend";
//import { useDispatch, useSelector } from "react-redux";
//import { getData } from "../services/actions/fullCollection";
//import { SET_MODAL_VIEW_STATE } from "../services/actions/modal";

export function ForgotPasswordPage() {
    const [value, setValue] = React.useState({ mail: "" })

    const onMailChange = e => {
        setValue({ ...value, mail: e.target.value })
    }

    return (
        <div className={styles.forgotPass}>
            <main className={styles.main}>
                <form className={styles.forgotPassForm}>
                    <h2>Восстановление пароля</h2>
                    <EmailInput placeholder="Укажите e-mail" value={value.mail} onChange={onMailChange} extraClass="pt-6" />
                    <Button extraClass="pt-6">Восстановить</Button>
                    <p className={"pt-20 " + styles.emptyMargin}> Вспомнили пароль? <Link to='/list'>Войти</Link></p>
                </form>
            </main>
        </div>
    );
}