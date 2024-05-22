import {
  DownloadSimple,
  GithubLogo,
  LinkedinLogo,
  Trash,
  UploadSimple,
  Users,
  XLogo,
} from '@phosphor-icons/react';
import {Link} from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="absolute z-10 flex flex-col border shadow-md rounded-lg w-[75%] sm:w-[50%] md:w-[35%] lg:w-[20%] items-start p-4 m-3">
      <button className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md my-1">
        <UploadSimple size={20} />
        Import Image
      </button>
      <button className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md">
        <DownloadSimple size={20} />
        Export Image
      </button>
      <button className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md my-1">
        <Users size={20} />
        Live collaboration
      </button>
      <button className="flex justify-start items-center gap-6 hover:bg-[#F1F0FF] w-full p-2 rounded-md my-1">
        <Trash size={20} />
        Reset
      </button>
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
