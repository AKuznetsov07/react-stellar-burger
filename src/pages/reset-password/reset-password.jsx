import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";
import styles from "./reset-password.module.css";
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

export function ResetPasswordPage() {
    const [value, setValue] = React.useState({ pass: "", code: "" })
    const onPassChange = e => {
        setValue({ ...value, pass: e.target.value })
    }

    const onCodeChange = e => {
        setValue({ ...value, code: e.target.value })
    }
    return (
        <div className={styles.resetPass}>
            <main className={styles.main}>
                <form className={styles.resetPassForm}>
                    <h2>Восстановление пароля</h2>
                    <PasswordInput placeholder="Введите новый пароль" value={value.pass} onChange={onPassChange} extraClass="pt-6" />
                    <Input placeholder="Введите код из письма" value={value.code} onChange={onCodeChange} extraClass="pt-6" />
                    <Button extraClass="pt-6">Сохранить</Button>
                    <p className={"pt-20 " + styles.emptyMargin}> Вспомнили пароль? <Link to='/list'>Войти</Link></p>
                </form>
            </main>
        </div>
    );
}