import {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from 'react-router-dom';
import socket from '../../socket/socket';
import {useRoom} from '../../store/store';

const JoinRoom = () => {
  const [roomId, setRoomId] = useState<string>('');
  const [name, setName] = useState('');

  const updateRoom = useRoom((state) => state.updateRoom);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomData = {
      name,
      roomId,
      userId: uuidv4(),
      host: false,
      presenter: false,
    };
    updateRoom(null);
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
        <h2 className="font-bold mr-auto mb text-2xl">Join Room</h2>
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
          <input
            type="text"
            className="border border-black p-3 rounded-lg outline-none w-full"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-[#6965DB] rounded-xl text-white w-fit px-3 py-3 mx-auto mt-7"
          onClick={handleSubmit}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
