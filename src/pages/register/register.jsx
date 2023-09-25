import styles from "./register.module.css";
import AppHeader from "../../components/app-header/app-header";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export function RegisterPage() {
    const [value, setValue] = React.useState({ login: "", pass: "",name:"" })
    const onPassChange = e => {
        setValue({ ...value, pass: e.target.value })
    }
    const onLogChange = e => {
        setValue({ ...value, login: e.target.value })
    }
    const onNameChange = e => {
        setValue({ ...value, name: e.target.value })
    }
    return (
        <div className={styles.register}>
            <main className={styles.main}>
                <form className={styles.registerForm}>
                    <h2>Регистрация</h2>
                    <Input placeholder="Имя" value={value.name} onChange={onNameChange} extraClass="pt-6" />
                    <EmailInput placeholder="E-mail" value={value.login} onChange={onLogChange} extraClass="pt-6" />
                    <PasswordInput name="Пароль" value={value.pass} onChange={onPassChange} extraClass="pt-6" />
                    <Button extraClass="pt-6">Зарегистрироваться</Button>
                    <p className={"pt-20 " + styles.emptyMargin}> Уже зарегестрированы? <Link to='/login'>Войти</Link></p>
                </form>
            </main>
        </div>
    );
}