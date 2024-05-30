import {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import {ClipboardText} from '@phosphor-icons/react';
import {useNavigate} from 'react-router-dom';
import socket from '../../socket/socket';
import { useRoom } from '../../store/store';


const CreateRoom = () => {
  const [roomId, setRoomId] = useState<string>(uuidv4());
  const [name, setName] = useState('');
  const updateRoom=useRoom((state)=>state.updateRoom)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuidv4(),
      host: true,
      presenter: true,
    };
    updateRoom(null)
    navigate(`/${roomId}`);
    socket.emit('userJoined', roomData);
    // console.log(roomData);
  };
  useEffect(() => {
    socket.on('userIsJoined', (data) => {
      if (data.success) {
        console.log('userJoined');
      } else {
        console.log('Userjoined error');
      }
    });
  });
  return (
    <div className="w-full flex flex-col items-center ">
      <div className="w-full flex flex-col gap-4 p-6">
        <h2 className="font-bold mr-auto mb text-2xl">Live Collaboration</h2>
        <h3 className="font-bold ">Your Name</h3>
        <input
          type="text"
          placeholder="Enter Your name"
          className="border border-black p-3 rounded-lg outline-none w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h3 className="font-bold ">ID</h3>
        <div className="flex w-full">
          <div className="w-[75%]">
            <input
              type="text"
              className="border border-black p-3 rounded-lg outline-none bg-[#F1F0FF] w-full"
              value={roomId}
              readOnly={true}
            />
          </div>
          <div className="flex justify-center bg-[#6965DB] rounded-xl w-[20%] ml-auto">
            <CopyToClipboard
              text={roomId}
              onCopy={() => toast.success('Room Id Copied To Clipboard!')}
            >
              <button className="flex justify-center items-center">
                <ClipboardText size={20} weight="bold" color="#ffffff" />
                <div className="text-white w-full">Copy</div>
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#6965DB] rounded-xl text-white w-fit px-3 py-3 mx-auto mt-7"
          onClick={handleSubmit}
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
