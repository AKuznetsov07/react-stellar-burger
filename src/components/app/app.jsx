import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import React from "react";

const SelectedIngridients = [{ _id: '60666c42cc7b410027a1a9b5', pos: 2 }, { _id: '60666c42cc7b410027a1a9b6', pos: 3 }, { _id: '60666c42cc7b410027a1a9b4', pos: 1 },
{ _id: '60666c42cc7b410027a1a9b5', pos: 6 }, { _id: '60666c42cc7b410027a1a9b6', pos: 4 }, { _id: '60666c42cc7b410027a1a9b4', pos: 5 }]
let BunId = '60666c42cc7b410027a1a9b1';

function App() {
    return (
        <div className={styles.app}>
            <AppHeader/>
            <div className={styles.main}>
                <div className={styles.burgerBlock}>
                    <BurgerIngredients ingridients={data} />
                    <BurgerConstructor fullIngridients={data} selectedIngridients={SelectedIngridients} bunId={BunId} />
                </div>
            </div>
        </div>
    );
}

export default App;