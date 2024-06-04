import {Toaster} from 'react-hot-toast';
import {X} from '@phosphor-icons/react';
import {useRoom, useToolStore} from '../../store/store';
import {cn} from '../../libs/utils';
import Panel from '../Panel/Panel';
import Whiteboard from '../Canvas/Whiteboard';
import JoinRoom from '../Collaboration/JoinRoom';
import CreateRoom from '../Collaboration/CreateRoom';
import {useState} from 'react';
import {AllShapes} from '../../CanvaTypes/CanvaTypes';

function SingleBoard() {
  const room = useRoom((stage) => stage.room);
  const updateRoom = useRoom((stage) => stage.updateRoom);

  const action = useToolStore((stage) => stage.action);
  const [allShapes, setAllShapes] = useState<AllShapes[]>([]);

  return (
    <div
      className={cn('flex relative h-screen w-screen', {
        'cursor-crosshair': action != 'Cursor',
      })}
    >
      {/* <div onClick={onBgClick}> */}
      <Panel />
      {/* </div> */}
      <Whiteboard />
      {room && (
        <div className="absolute top-36 right-80  h-[70%] w-1/2 flex flex-col border shadow-md py-1 px-2 justify-center items-center mx-auto rounded-lg bg-white">
          <button
            className="absolute top-5 right-5"
            onClick={() => updateRoom(null)}
          >
            <X size={20} />
          </button>

          {room == 'Join' ? <JoinRoom /> : <CreateRoom />}
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default SingleBoard;
