import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {
    // isAuthChecked ��� ����, ������������ ��� �������� ������ �����������
    // ��� ���� ��������� ���� �������� �� ����� ��������, ����� ������,
    // ��� ��� ���� �������� ���� �����.
    const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
    const user = useSelector((store) => store.user.user);
    const location = useLocation();

    if (!isAuthChecked) {
        // ������ ��� �����������
        // ������� ��������� � ��
        // ����� ������������ ������ null ��� �������� �������
        return null;
    }

    if (onlyUnAuth && user) {
        // ������������ �����������, �� ���� ������������ ��� ����������������� ������������
        // ������ �������� �� ������� �������� ��� �� ��� �����, ��� ������� � location.state.from
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // !onlyUnAuth && user ������������ ����������� � ���� ��� ��������������� ������������

    return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
    <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
