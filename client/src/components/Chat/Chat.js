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


    // const data = queryString.parse();
    const EndPoint = `localhost:5000`

    useEffect(() => {

        const name = searchParams.get('name');
        const room = searchParams.get('room');


        socket = io(EndPoint, { transports: ['websocket'] })



        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            // if (error) {
            //     alert(error);
            // }
        })






        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [searchParams, EndPoint]);





    useEffect(() => {
        socket.on('message', (message) => {

            setMessages([...messages, message])



        })
    }, [messages]);




    //function for sending messages.....


    const sendMessage = (e) => {
        e.preventDefault();
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