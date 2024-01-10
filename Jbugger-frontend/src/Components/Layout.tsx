import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import NavTop from "./NavTop";
import {Container} from "react-bootstrap";

const Layout = () => {
    return (
        <>
            <NavTop/>
            <Container className="mt-3 pb-5">
                <Outlet />
            </Container>
            
        </>
    )
};

export default Layout;