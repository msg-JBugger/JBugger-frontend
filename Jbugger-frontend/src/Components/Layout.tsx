import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import NavTop from "./NavTop";

const Layout = () => {
    return (
        <>
            <NavTop/>     
            <Outlet />
        </>
    )
};

export default Layout;