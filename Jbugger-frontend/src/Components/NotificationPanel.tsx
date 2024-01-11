import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import axios from 'axios'
import NotificationBox from './NotificationBox';
import { Notification } from '../Models/Notification';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}

const NotificationPanel: React.FC<Props> = ({ isOpen, closeModal }) => {
    const [notificationData, setNotificationData] = useState<Notification[]>([]);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
    
        const fetchNotifications = async () => {
          try {
            const response = await axios.get(
              import.meta.env.VITE_SERVER_ADDRESS + import.meta.env.VITE_SERVER_PORT + `api/notification`,
                {
                    headers: {
                    Authorization: "Bearer " + jwt,
                    },
                }
              );
            setNotificationData(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching bug details:', error);
          }
        };
        if(isOpen) {
            fetchNotifications();
        }
      }, [isOpen]);


    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} 
        style={{
            overlay: {
              zIndex: 1000,
              backgroundColor: 'rgba(255, 255, 255, 0.0)',
            },
            content: {
              zIndex: 1001,
              width: 'auto',
              height: 'auto',
              top: '10%',
              left: '10%',
              right: '10%',
              bottom: '10%',
            },
          }}>
            <div className='mb-3'>
                <div className="container">
                    <div className='row'>
                        <div className='col-2'> 
                            <h2>Notifications</h2>
                        </div>
                        <div className='col-2 offset-md-8'>
                            <button onClick={closeModal} className='btn btn-primary shadow-none w-100 mb-2'>Close</button>
                        </div>
                    </div>  
                </div>
                <div className="container">
                    <div className='row'>
                        <div className='col'>
                            {notificationData.map((item) => (
                                <NotificationBox createdTime={item.createdTime} message={item.msg} notificationId={item.notificationId} type={item.type} url={item.url}>
                                </NotificationBox>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default NotificationPanel;