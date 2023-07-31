import styles from "./modal.module.css";
import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

const modalRoot = document.getElementById("root");
const ModalContainer = (props) => {

    const containerRef = useRef(null);

    const { title, closeFunc, children } = props;

    function Close() {
        if (closeFunc)
            closeFunc();
    }

    function onClick(eventArgs) {
        if ((eventArgs.target === containerRef.current))
            Close();
    }

    function onKeyDown(eventArgs) {
        if (eventArgs.key === 'Escape')
            Close();
    }

    useEffect(() => {
        document.addEventListener('click', onClick)
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('click', onClick, false)
            document.removeEventListener('keydown', onKeyDown, false);
        }
    }, [closeFunc])



    const closeAction = () => Close();

    return (ReactDOM.createPortal(
        <React.Fragment>
            <div className={styles.ModalContainer} ref={containerRef}>
                <ModalForm title={title} closeClickHandler={closeAction}>
                    {children}
                </ModalForm>
            </div>
        </React.Fragment>, modalRoot
    ))
}




const ModalForm = (props) => {

    const { title, closeClickHandler, children } = props;
    return (
        <div className={styles.ModalForm}>
            <div className={styles.ModalFormContent}>
                <div className={styles.ModalFormHeader}>
                    <p className="text text_type_main-large">{title}</p>
                    <button className={styles.CloseButton} type="button" onClick={closeClickHandler}>
                        <CloseIcon type="primary" />
                    </button>
                </div>

                <div className={styles.ModalFormBody}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalContainer;

ModalForm.propTypes = {
    title: PropTypes.string,
    closeClickHandler: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node)
}
ModalContainer.propTypes = {
    title: PropTypes.string,
    closeFunc: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node)
}