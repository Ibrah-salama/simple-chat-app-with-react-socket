import React, {useState, useEffect}  from 'react';
import postData from './helpers/fetch'

const ShortPolling = () => {
    const [message, setMessage] = useState('');
    const [notifications, setNotifications] = useState([]);


    const handleSubmit= async (e) => {
        e.preventDefault()
        await postData('http://localhost:3005/messages', {message,time: Date.now()})
        setMessage('')
      }
    useEffect(() => {
        setTimeout(async () => {      
          const response = await 
          fetch(`http://localhost:3005/messages?last=${notifications.length > 0 ? 
          notifications[notifications.length - 1].time : 0}`).then((res)=> res.json())
          setNotifications(notifications.concat(response))
        }, 5000);
      }, [notifications])
    return(
        <div>
            <div >
                <form id="form" className="validate" onSubmit={handleSubmit}>
                    <div >
                        <label>Message</label>
                        <input value={message} type="text"  placeholder="Type a message" 
                            required onChange={(e)=> setMessage(e.target.value) }>
                        </input>
                    </div>        
                </form>
            </div>
            <section>
                <div>
                    <h2>Messages</h2>
                    <ul>{ notifications.map((n)=> <li>{n.message}</li>)}</ul>
                </div>
            </section>
        </div>
    );

};

export default ShortPolling;