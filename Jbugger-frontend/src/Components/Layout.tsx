import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Layout = () => {
    return (
        <>
            <Outlet />
        </>
    )
};

export default Layout;