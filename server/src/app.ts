import express, {Express} from 'express';
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

const app: Express = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('userJoined', (data) => {
    const {userId, roomId,name,host,presenter} = data;
    console.log(data);
    socket.join(roomId);
    socket.emit('userIsJoined', {success: true});
  });
});
export {server};
