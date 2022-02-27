import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';


// import queryString from 'query-string'


import io from 'socket.io-client'


let socket;


const Chat = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const [searchParams] = useSearchParams();

    const nameParams = searchParams.get('name');
    const roomParams = searchParams.get('room')
    // const data = queryString.parse();
    const EndPoint = `localhost:5000`

    useEffect(() => {


        socket = io(EndPoint, { transports: ['websocket'] })



        setName(nameParams);
        setRoom(roomParams);

        socket.emit('join', { name, room }, (error) => {
            // if (error) {
            //     alert(error);
            // }
        })






        return () => {
            socket.on('disconnect')
            socket.off()
        }
    }, [nameParams, roomParams, EndPoint, name, room]);





    useEffect(() => {
        socket.on('message', (message) => {

            setMessages([...messages, message])



        })
    }, [messages, message]);




    //function for sending messages.....


    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }






    console.log(message, messages);






    return (
        <div className='outContainer'>


            <div className='container'>
                <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} />
            </div>
        </div>
    )
}

export default Chat