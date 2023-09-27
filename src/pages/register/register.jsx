import styles from "./register.module.css";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { EmailInput, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../../services/actions/auth.js";

export function RegisterPage() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState({ email: "", password: "",name:"" })
    const onPassChange = e => {
        setValue({ ...value, password: e.target.value })
    }
    const onMailChange = e => {
        setValue({ ...value, email: e.target.value })
    }
    const onNameChange = e => {
        setValue({ ...value, name: e.target.value })
    }
    const handleRegisterButtonClick = () => {
        console.log("handleRegisterButtonClick")
        dispatch(registerUser(value.email, value.password, value.name));
    }

    return (
        <div className={styles.register}>
            <main className={styles.main}>
                <form className={styles.registerForm}>
                    <h2>Регистрация</h2>
                    <Input placeholder="Имя" value={value.name} onChange={onNameChange} extraClass="pt-6" />
                    <EmailInput placeholder="E-mail" value={value.email} onChange={onMailChange} extraClass="pt-6" />
                    <PasswordInput name="Пароль" value={value.password} onChange={onPassChange} extraClass="pt-6" />
                    <Button htmlType="button" extraClass="pt-6" onClick={handleRegisterButtonClick}>Зарегистрироваться</Button>
                    <p className={"pt-20 " + styles.emptyMargin}> Уже зарегестрированы? <Link to='/login'>Войти</Link></p>
                </form>
            </main>
        </div>
    );
}