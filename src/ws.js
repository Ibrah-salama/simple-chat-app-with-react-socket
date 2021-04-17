import { useState, useEffect, useMemo} from 'react';
import io from 'socket.io-client';
import {    Widget,addResponseMessage} from 'react-chat-widget';

const BASE_URL = 'http://localhost:4000';
const socket = io(BASE_URL);
const WS =()=>{
    const handleNewUserMessage = (message)=>{
        console.log(message);
        socket.emit('message',message);
    };
    useEffect(()=>{
        //addResponseMessage for 
        socket.on('new-message',(message)=>{
            addResponseMessage(message);
        })
    },[])
    return(
        <Widget
        handleNewUserMessage={handleNewUserMessage}
        />
    )
}