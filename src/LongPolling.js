import React, { useState, useEffect } from 'react';
import postData from './helpers/fetch';


const LongPolling = () => {
    const [message, setMessage] = useState('');
    const [notification, setNotification] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        postData('http://localhost:3005/messages', { message })
    };


    const getNotifications = async () => {
        const id = Math.ceil(Math.random() * 1000);
        const res = await postData('http://localhost:3005/messages/subscribe', { id });

        setNotification(notification.concat(res));
        setMessage('');
    }
    useEffect(() => {
        getNotifications();
    }, [notification])
    return (
        <>
            <div className="FORM-WRAPPER">
                <form id="form" className="validate" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>messages</label>
                        <input type="text" name="message" id="message" placeholder="message"
                         required onChange={(e) => setMessage(e.target.value)} value={message} />
                    </div>
                </form>
            </div >
            <section>
                <div>
                    <h2>Messages </h2>
                    <ul className="check-list">
                        {
                            notification.map((n, i) => <li key={i}>{n.message}</li>)
                        }
                    </ul>
                </div>
            </section>
        </>
    );
}

export default LongPolling