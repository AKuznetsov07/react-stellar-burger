import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ProfilePage,
  ProfileOrdersPage,
  ProfileOrdersIdPage,
  NotFound404,
} from "./pages";
import IngredientDetails from "./components/ingredient-info/ingredient-info";
import ProfileEditForm from "./components/profile-edit-form/profile-edit-form";
import OrderInfo from "./components/order-info/order-info";
import Modal from "./components/modal/modal";
import AppHeader from "./components/app-header/app-header";
import CentredControl from "./components/centred-control/centred-control";
import {
  OnlyAuth,
  OnlyUnAuth,
} from "./components/protected-route/protected-route";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "./services/actions/auth.js";
import { getData } from "./services/actions/fullCollection.js";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getData());
    dispatch(checkUserAuth());
  }, [dispatch]);
  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route
          path="/profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route index element={<ProfileEditForm />} />
          <Route path="orders" element={<ProfileOrdersPage />}>
            <Route path=":id" element={<ProfileOrdersIdPage />} />
          </Route>
        </Route>

        <Route
          path="/ingredients/:id"
          element={
            <CentredControl>
              <IngredientDetails />
            </CentredControl>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal closeFunc={handleModalClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
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
