import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';


// import queryString from 'query-string'


import { io } from 'socket.io-client'


let socket;


const Chat = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [searchParams] = useSearchParams();

    const nameParams = searchParams.get('name');
    const roomParams = searchParams.get('room')
    // const data = queryString.parse();
    const EndPoint = `localhost:5000`

    useEffect(() => {


        socket = io(EndPoint, { transports: ['websocket'] })



        setName(nameParams);
        setRoom(roomParams);

        socket.emit('join', { name, room }, () => {

        })






        return () => {
            socket.disconnect()
            socket.off()
        }
    }, [nameParams, roomParams, EndPoint, name, room])


    return (
        <div>Chat</div>
    )
}

export default Chat