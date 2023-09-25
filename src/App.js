import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, ProfilePage, ProfileOrdersPage, ProfileOrdersIdPage, NotFound404 } from './pages';
import IngredientDetails from "./components/ingredient-info/ingredient-info";
import OrderInfo from "./components/order-info/order-info";
import Modal from "./components/modal/modal";
import AppHeader from "./components/app-header/app-header";
import { OnlyAuth, OnlyUnAuth } from "./components/protected-route/protected-route";

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
        navigate(-1);
    };

    console.log("location");
    console.log(location);
    console.log("location.state");
    console.log(location.state);
    return (
        
        <>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
                <Route path="/profile/orders" element={<OnlyAuth component={<ProfileOrdersPage />} />}/>
                <Route path="/profile/orders/:id" element={<OnlyAuth component={<ProfileOrdersIdPage />} />}/>

                <Route path='/ingredients/:id' element={<IngredientDetails />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
            {background && (
                <Routes>
                    <Route path='/ingredients/:id'
                        element={
                            <Modal closeFunc={handleModalClose} title="Детали ингредиента">
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                    <Route path='/profile/orders/:id'
                        element={
                            <Modal closeFunc={handleModalClose}>
                                <OrderInfo />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
}