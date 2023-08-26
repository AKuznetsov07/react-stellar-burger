import styles from "./burger-ingredients.module.css";
import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ScrollingContainer from "../scrolling-container/scrolling-container";
import IngridientBlock from "../ingridient-block/ingridient-block";
import IngridientElement from "../ingridient-element/ingridient-element";
import PropTypes from "prop-types";

function BurgerIngredients(props) {
    const { handleOpenModal } = props;
    const [current, setCurrent] = React.useState('one');

    return (
        <div className={`${styles.BurgerIngredients}`}>
            <p className="text text_type_main-large  mb-5 mt-5">Соберите бургер</p>
            <section className={styles.tabSection}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки
                </Tab>
            </section>
            <div className={styles.ingridientsScroll}>
                <ScrollingContainer>
                    {IngridientBlock({ Title: "Булки", elementType: "bun", clickHandler: handleOpenModal, wrappedNode: IngridientElement }) }
                    {IngridientBlock({ Title: "Соусы", elementType: "sauce", clickHandler: handleOpenModal, wrappedNode: IngridientElement }) }
                    {IngridientBlock({ Title: "Начинки", elementType: "main", clickHandler: handleOpenModal, wrappedNode: IngridientElement }) }
                </ScrollingContainer>
            </div>
        </div>
    );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    handleOpenModal: PropTypes.func
};