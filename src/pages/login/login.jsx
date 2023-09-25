import styles from "./login.module.css";
import AppHeader from "../../components/app-header/app-header";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
//import BurgerConstructor from "../components/burger-constructor/burger-constructor";
//import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
//import Modal from "../components/modal/modal";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
//import { DndProvider } from "react-dnd";
//import { HTML5Backend } from "react-dnd-html5-backend";
//import { useDispatch, useSelector } from "react-redux";
//import { getData } from "../services/actions/fullCollection";
//import { SET_MODAL_VIEW_STATE } from "../services/actions/modal";

export function LoginPage() {
    const [value, setValue] = React.useState({login:"",pass:""})
    const onPassChange = e => {
        setValue({ ...value, pass: e.target.value })
    }
    const onLogChange = e => {
        setValue({ ...value, login: e.target.value })
    }
    return (
        <div className={styles.login}>
            <main className={styles.main}>
                <form className={styles.loginForm}>
                    <h2>Вход</h2>
                    <EmailInput placeholder="Email" value={value.login} onChange={onLogChange} extraClass="pt-6" />
                    <PasswordInput name="Пароль" value={value.pass} onChange={onPassChange} extraClass="pt-6" />
                    <Button htmlType="button" type="primary" size="large" extraClass="pt-6">Войти</Button>
                    <p className={"pt-20 " + styles.emptyMargin} > Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
                    <p className={"pt-4 " + styles.emptyMargin} > Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
                    <p></p>
                </form>
            </main>
        </div>
    );
}