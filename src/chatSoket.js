import {useState,useEffect,useMemo} from 'react';
import io from 'socket.io-client';
import {Widget,addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const Base_URL='http://localhost:5000';

const socket=io(Base_URL);

const Ws=()=>{
    const[clientId , setClientId]=useState('')
    const handleNewUserMessage=(message)=>{
        console.log(message);
        socket.emit('message',{id : clientId, message: message});
    };
    useEffect(()=>{
        socket.on('message',(message)=>{
            addResponseMessage(message.message);
        });
    },[]);
    return(
        <>
            <input value={clientId} onChange={(e)=>setClientId(e.target.value)}></input>
            <Widget 
                handleNewUserMessage={handleNewUserMessage}
            />
        </>
    );
};
export default Ws;