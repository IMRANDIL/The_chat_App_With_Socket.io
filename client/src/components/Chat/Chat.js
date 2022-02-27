import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';


import queryString from 'query-string'


import io from 'socket.io-client'





const Chat = () => {


    const [searchParams] = useSearchParams();

    const name = searchParams.get('name');
    const room = searchParams.get('room')
    const data = queryString.parse();


    useEffect(() => {

    }, [])


    return (
        <div>Chat</div>
    )
}

export default Chat