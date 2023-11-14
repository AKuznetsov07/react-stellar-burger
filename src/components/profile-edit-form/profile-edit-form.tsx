import styles from "./profile-edit-form.module.css";
import React, { FunctionComponent, useState } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser } from "../../services/actions/auth";
import { useDispatch, useSelector } from "../../services/storage/hooks";
import { TUserDataType } from "../../services/custom-types/custom-types";

type TProfileEditFormProps = {
};

export const ProfileEditForm: FunctionComponent<TProfileEditFormProps> = ({ ...props }) => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.user);
    const [value, setValue] = useState({
        email: user?.email ? user.email : "",
        password: user?.password ? user.password : "",
        name: user?.name ? user.name : "",
        needSave: false,
    });

    const onPassChange = (e: { target: { value: string; }; }) => {
        const newValue = { ...value, password: e.target.value };
        setValue({ ...newValue, needSave: checkValues(newValue) });
    };
    const onMailChange = (e: { target: { value: string; }; }) => {
        const newValue = { ...value, email: e.target.value };
        setValue({ ...newValue, needSave: checkValues(newValue) });
    };
    const onNameChange = (e: { target: { value: string; }; }) => {
        const newValue = { ...value, name: e.target.value };
        setValue({ ...newValue, needSave: checkValues(newValue) });
    };
    const checkValues = (newValue: TUserDataType & { needSave: boolean }) => {
        if (
            user?.email !== newValue.email ||
            (user.password && user.password !== newValue.password) ||
            (!user.password && newValue.password) ||
            user.name !== newValue.name
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmitButtonClick = () => {
        dispatch(
            updateUser({
                email: value.email,
                password: value.password ? value.password : "",
                name: value.name,
            }),
        );

        setValue({ ...value, needSave: false });
    };

    const handleCancelButtonClick = () => {
        const newValue = {
            email: user?.email ? user.email : "",
            password: user?.password ? user.password : "",
            name: user?.name ? user.name : "",
            needSave: false,
        };
        setValue(newValue);
    };

    return (
        <form className={styles.navGrid + " " + styles.bigGap}>
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
            {value.needSave && (
                <div>
                    <Button
                        htmlType="button"
                        extraClass="mt-6"
                        onClick={handleSubmitButtonClick}
                    >
                        Сохранить
                    </Button>
                    <Button
                        htmlType="button"
                        extraClass="mt-6"
                        onClick={handleCancelButtonClick}
                    >
                        Отменить
                    </Button>
                </div>
            )}
        </form>
    );
}