import express, {Express} from 'express';
import http from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import {AllShapes} from './types';

const app: Express = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server);

let roomIdGlobal: string, imageURLGlobal: string;

let dataGlobal: AllShapes[] = [];
// if(dataGlobal[dataGlobal.length-1]===null){
// }
io.on('connection', (socket) => {
  console.log(socket.id,"Connected");
  socket.on('senderCanvaData', (data) => {
    if (data !== null) {
      if (dataGlobal.length > 0) {
        if (dataGlobal[dataGlobal.length - 1]?.id === data?.id) {
          dataGlobal[dataGlobal.length - 1] = data;
        } else {
          dataGlobal.push(data);
        }
      } else {
        dataGlobal.push(data);
      }
    }
    console.log("Data",dataGlobal);
    
    // dataGlobal.push(data)
    // console.log('new', dataGlobal);
    socket.broadcast.emit('recieverCanvaData', dataGlobal);
  });

  // socket.on('disconnect', () => {
  //   console.log('disconnected');
  // });
});
app.get('/data', (req, res) => {
  res.json(dataGlobal);
});
export {server};
