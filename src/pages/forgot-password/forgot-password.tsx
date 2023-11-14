import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import React, { FormEvent, FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useDispatch } from "react-redux";
import { sendResetPasswordMail } from "../../services/actions/auth";
import { useDispatch } from "../../services/storage/hooks";
import { TAuthPromiseResultType } from "../../services/custom-types/custom-types";

//export function ForgotPasswordPage() {
//  const [value, setValue] = React.useState({ email: "" });
//  const dispatch = useDispatch();

//  const navigate = useNavigate();
//  const onMailChange = (e) => {
//    setValue({ ...value, email: e.target.value });
//  };

//  const handleSendResetPasswordMailButtonClick = (evt) => {
//    evt.preventDefault();
//    dispatch(sendResetPasswordMail(value.email)).then((res) => {
//      if (res.success) {
//        localStorage.setItem("forgotPasswordRedirect", true);
//        navigate(`/reset-password`);
//      }
//    });
//  };

//  return (
//    <div className={styles.forgotPass}>
//      <main className={styles.main}>
//        <form
//          className={styles.forgotPassForm}
//          onSubmit={handleSendResetPasswordMailButtonClick}
//        >
//          <p
//            className={
//              "text text_type_main-medium " +
//              styles.emptyPadding +
//              " " +
//              styles.emptyMargin
//            }
//          >
//            Восстановление пароля
//          </p>
//          <EmailInput
//            placeholder="Укажите e-mail"
//            value={value.email}
//            onChange={onMailChange}
//            extraClass="pt-6"
//          />
//          <Button extraClass={"mt-6"} htmlType="submit">
//            Восстановить
//          </Button>
//          <p
//            className={
//              "text text_type_main-default text_color_inactive pt-20 " +
//              styles.emptyMargin
//            }
//          >
//            Вспомнили пароль?
//            <Link className={styles.clearLink} to="/login">
//              Войти
//            </Link>
//          </p>
//        </form>
//      </main>
//    </div>
//  );
//}

////
type TForgotPasswordPageProps = {
}/* & React.ButtonHTMLAttributes<HTMLButtonElement>*/;

export const ForgotPasswordPage: FunctionComponent<TForgotPasswordPageProps> = () => {
    const [value, setValue] = React.useState<{email:string}>({ email: "" });
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const onMailChange = (e: { target: { value: string; }; }) => {
        setValue({ ...value, email: e.target.value });
    };

    const handleSendResetPasswordMailButtonClick = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        //////
        
        //    dispatch(getUser())
        //        .catch((e: unknown) => {
        //            if (e instanceof Error) {
        //                localStorage.removeItem("accessToken");
        //                localStorage.removeItem("refreshToken");
        //                dispatch(setUser(null));
        //            }

        //        })
        //        .catch((e: unknown) => {

        //            if (e instanceof Error) {
        //                console.error("Failed to check auth.");
        //                console.error(e);
        //            }
        //        })
        //        .finally(() => dispatch(setAuthChecked(true)));
        /////
        sendResetPasswordMail(value.email).then((res: TAuthPromiseResultType) => {
            if (res.success) {
                localStorage.setItem("forgotPasswordRedirect", "true");
                navigate(`/reset-password`);
            }
        });
    };

    return (
        <div className={styles.forgotPass}>
            <main className={styles.main}>
                <form
                    className={styles.forgotPassForm}
                    onSubmit={handleSendResetPasswordMailButtonClick}
                >
                    <p
                        className={
                            "text text_type_main-medium " +
                            styles.emptyPadding +
                            " " +
                            styles.emptyMargin
                        }
                    >
                        Восстановление пароля
                    </p>
                    <EmailInput
                        placeholder="Укажите e-mail"
                        value={value.email}
                        onChange={onMailChange}
                        extraClass="pt-6"
                    />
                    <Button extraClass={"mt-6"} htmlType="submit">
                        Восстановить
                    </Button>
                    <p
                        className={
                            "text text_type_main-default text_color_inactive pt-20 " +
                            styles.emptyMargin
                        }
                    >
                        Вспомнили пароль?
                        <Link className={styles.clearLink} to="/login">
                            Войти
                        </Link>
                    </p>
                </form>
            </main>
        </div>
    );
}