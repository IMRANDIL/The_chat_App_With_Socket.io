const express = require('express');

require('dotenv').config()

const http = require('http')

const app = express();

const cors = require('cors');

const socketio = require('socket.io');
const router = require('./router/router');




app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))





const server = http.createServer(app)


const io = socketio(server);

io.on('connection', (socket) => {
    console.log('we have a new connection');

    socket.on('disconnect', () => {
        console.log('user left');
    })
})


app.use(router)



const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`server runs on port: ${PORT}😃`);
})