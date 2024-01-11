import NotificationPanel from './NotificationPanel';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';

interface Props {
    createdTime: Date;
    message: string;
    notificationId: number;
    type: string;
    url: string;
}

const NotificationBox: React.FC<Props> = ({ createdTime, message, notificationId, type, url }) => {
    return (
        <>
            <div className="container">
                <h5>Notification #{notificationId}:</h5>
                <p><b>Type:</b> {type}</p>
                <p><b>Message:</b> {message}</p>
                <p><b>Created time:</b> {createdTime.toString()}</p>
                <p><b>URL:</b> {url}</p>
            </div>
        </>
    );
}
export default NotificationBox;