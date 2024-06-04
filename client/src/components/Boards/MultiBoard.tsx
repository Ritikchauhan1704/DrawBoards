import {useToolStore} from '../../store/store';
import {cn} from '../../libs/utils';
import Panel from '../Panel/Panel';
import Whiteboard from '../Canvas/Whiteboard';
import {useEffect, useState} from 'react';
import {AllShapes} from '../../CanvaTypes/CanvaTypes';
import socket from '../../socket/socket';

function MultiBoard() {
  const action = useToolStore((stage) => stage.action);
  const [allShapes, setAllShapes] = useState<AllShapes[]>([]);
  useEffect(() => {
    const getData = () => {
      fetch('http://localhost:3000/data')
        .then((res) => res.json())
        .then((data) => setAllShapes(data))
        .catch(() => console.log('Error'));
    };

    getData();
  }, []);
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id, 'Connected');
    });
    socket.on('recieverCanvaData', (data) => {
      setAllShapes(data);
      console.log(data);
      
    });

    () => {
      socket.off('connect');
      socket.off('recieverCanvaData');
      socket.disconnect();
    };
  }, []);
  return (
    <div
      className={cn('flex relative h-screen w-screen', {
        'cursor-crosshair': action != 'Cursor',
      })}
    >
      <Panel />

      <Whiteboard allShapes={allShapes} setAllShapes={setAllShapes} />
    </div>
  );
}

export default MultiBoard;
