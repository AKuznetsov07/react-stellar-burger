import styles from "./home.module.css";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import React, { FunctionComponent } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//import { useDispatch, useSelector } from "react-redux";
import { SET_MODAL_VIEW_STATE, setModalViewStateAction } from "../../services/actions/modal";
import loadingImg from "../../images/loading.gif";

import { Modal } from "../../components/modal/modal";
import { useDispatch, useSelector } from "../../services/storage/hooks";

//export function HomePage() {
//  const dispatch = useDispatch();

//  const modalControl = useSelector(
//    (store) => store.modalState.modalPopupControl,
//  );
//  const isModalOpened = useSelector((store) => store.modalState.isModalOpened);
//  const modalTitle = useSelector((store) => store.modalState.modalPopupTitle);

//  function closeModal(node) {
//    dispatch({
//      type: SET_MODAL_VIEW_STATE,
//      isOpened: false,
//    });
//  }
//  const handleCloseModal = (node) => closeModal(node);

//  const isLoadedRequest = useSelector(
//    (store) => store.selectedIngredients.makingRequest,
//  );
//  return (
//    <div className={styles.home}>
//      {isModalOpened && (
//        <Modal title={modalTitle} closeFunc={handleCloseModal}>
//          {!isLoadedRequest && modalControl}
//          {isLoadedRequest && (
//            <img
//              src={loadingImg}
//              alt="Order Done"
//              className={styles.preloadImg}
//            />
//          )}
//        </Modal>
//      )}
//      <main className={styles.main}>
//        <div className={styles.burgerBlock}>
//          <DndProvider backend={HTML5Backend}>
//            <BurgerIngredients />
//            <BurgerConstructor />
//          </DndProvider>
//        </div>
//      </main>
//    </div>
//  );
//}


/////
type THomePageProps = {
}/* & React.ButtonHTMLAttributes<HTMLButtonElement>*/;

export const HomePage: FunctionComponent<THomePageProps> = () => {
    const dispatch = useDispatch();

    const modalControl = useSelector(
        (store) => store.modalState.modalPopupControl,
    );
    const isModalOpened = useSelector((store) => store.modalState.isModalOpened);
    const modalTitle = useSelector((store) => store.modalState.modalPopupTitle);

    function closeModal() {
        dispatch(setModalViewStateAction(false))
        //dispatch({
        //    type: SET_MODAL_VIEW_STATE,
        //    isOpened: false,
        //});
    }
    const handleCloseModal = () => closeModal();

    const isLoadedRequest = useSelector(
        (store) => store.selectedIngredients.makingRequest,
    );
    return (
        <div className={styles.home}>
            {isModalOpened && (
                <Modal title={modalTitle} closeFunc={handleCloseModal}>
                    {!isLoadedRequest && modalControl}
                    {isLoadedRequest && (
                        <img
                            src={loadingImg}
                            alt="Order Done"
                            className={styles.preloadImg}
                        />
                    )}
                </Modal>
            )}
            <main className={styles.main}>
                <div className={styles.burgerBlock}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </div>
            </main>
        </div>
    );
}