import {
  DownloadSimple,
  GithubLogo,
  LinkedinLogo,
  Trash,
  UploadSimple,
  Users,
  XLogo,
} from '@phosphor-icons/react';
import {useCallback, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useExportImage, useImportImage, useRoom} from '../../../store/store';

const SideBar = () => {

  const updateImage = useImportImage((state) => state.updateImage);
  const onImportImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        const imageUrl = URL.createObjectURL(e.target.files?.[0]);
        const image = new Image(250, 250);
        image.src = imageUrl;
        updateImage(image);
      }
      e.target.files = null;
    },
    [updateImage]
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const onImportImageClick = useCallback(() => {
    fileRef?.current && fileRef?.current?.click();
  }, []);

  const stageRef = useExportImage((stage) => stage.ref);

  const downloadURI = (uri: string | undefined, name: string) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onExportClick = useCallback(() => {
    const dataUri = stageRef?.current?.toDataURL({pixelRatio: 3});
    downloadURI(dataUri, 'project.png');
  }, [stageRef]);

  const updateRoom=useRoom(stage=>stage.updateRoom)
  return (
    <div className="absolute z-10 flex flex-col border shadow-md rounded-lg w-[75%] sm:w-[50%] md:w-[35%] lg:w-[20%] items-start p-4 m-3 bg-white">
      <div className="flex w-full">
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          onChange={onImportImage}
        />
        <button
          className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md my-1"
          onClick={onImportImageClick}
        >
          <UploadSimple size={20} />
          Import Image
        </button>
      </div>
      <button
        className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md"
        onClick={onExportClick}
      >
        <DownloadSimple size={20} />
        Export Image
      </button>
      <button
        className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md my-1"
        onClick={()=>updateRoom("Join")}
      >
        <Users size={20} />
        JoinRoom
      </button>
      <button
        className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md my-1"
        onClick={()=>updateRoom("Create")}
      >
        <Users size={20} />
        CreateRoom
      </button>
      <button className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md my-1">
        <Trash size={20} />
        Reset
      </button>

      {/* line break */}
      <div className=" h-[1px] w-full rounded-md my-2 bg-slate-100 "></div>

      {/* Social Links */}
      <button className="hover:bg-[#F1F0FF] w-full p-2 rounded-md my-1">
        <Link
          to="https://github.com/Ritikchauhan1704"
          target="_blank"
          className="flex justify-start items-center gap-6 w-full"
        >
          <GithubLogo size={20} />
          Github
        </Link>
      </button>
      <button className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md my-1">
        <Link
          to="https://www.linkedin.com/in/ritik-chauhan-8b1864280/"
          target="_blank"
          className="flex justify-start items-center gap-6 w-full"
        >
          <LinkedinLogo size={20} /> Linkedin
        </Link>
      </button>
      <button className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md my-1">
        <Link
          to="https://x.com/RitikCh51552702"
          target="_blank"
          className="flex justify-start items-center gap-6 w-full"
        >
          <XLogo size={20} /> Follow
        </Link>
      </button>
    </div>
  );
};

export default SideBar;
