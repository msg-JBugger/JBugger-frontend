import NotificationPanel from './NotificationPanel';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';

function NotificationButton() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <button
            className="navbar-toggler"
            type="button"
            aria-expanded="false"
            aria-label="Notifications"
            onClick={() => {setModalIsOpen(true);}}
            >
                <span className="bi bi-bell"></span>
            </button>
            <NotificationPanel isOpen={modalIsOpen} closeModal={closeModal} />
        </>
    );
}
export default NotificationButton;