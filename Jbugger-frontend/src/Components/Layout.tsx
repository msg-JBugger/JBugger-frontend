import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Layout = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                <div className="container-xl">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        </li>   
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
};

export default Layout;