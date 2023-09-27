import styles from "./login.module.css";
import AppHeader from "../../components/app-header/app-header";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
//import BurgerConstructor from "../components/burger-constructor/burger-constructor";
//import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
//import Modal from "../components/modal/modal";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/auth.js";
//import { DndProvider } from "react-dnd";
//import { HTML5Backend } from "react-dnd-html5-backend";
//import { useDispatch, useSelector } from "react-redux";
//import { getData } from "../services/actions/fullCollection";
//import { SET_MODAL_VIEW_STATE } from "../services/actions/modal";

export function LoginPage() {
    const [value, setValue] = React.useState({ email: "", password: "" })
    const dispatch = useDispatch();
    const onPassChange = e => {
        setValue({ ...value, password: e.target.value })
    }
    const onLogChange = e => {
        setValue({ ...value, email: e.target.value })
    }

    const handleLoginButtonClick = () => {
        console.log("handleLoginButtonClick")
        //login = (email, password)
        dispatch(login(value.email, value.password));
    }

    return (
        <div className={styles.login}>
            <main className={styles.main}>
                <form className={styles.loginForm}>
                    <h2>Вход</h2>
                    <EmailInput placeholder="Email" value={value.email} onChange={onLogChange} extraClass="pt-6" />
                    <PasswordInput name="Пароль" value={value.password} onChange={onPassChange} extraClass="pt-6" />
                    <Button extraClass="pt-6" htmlType="button" onClick={handleLoginButtonClick}>Войти</Button>
                    <p className={"pt-20 " + styles.emptyMargin} > Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
                    <p className={"pt-4 " + styles.emptyMargin} > Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
                    <p></p>
                </form>
            </main>
        </div>
    );
}