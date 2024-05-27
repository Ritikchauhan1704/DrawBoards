import {
  ArrowRight,
  Circle,
  Cursor,
  Diamond,
  Eraser,
  List,
  Minus,
  PencilSimpleLine,
  Rectangle,
  TextAa,
} from '@phosphor-icons/react';
import Tool from './Tool';
import {useToolStore} from '../../store/store';
import {useState} from 'react';
import SideBar from './SideBar/SideBar';
import {cn} from '../../libs/utils';

const Panel = () => {
  const updateAction = useToolStore((state) => state.updateAction);
  const [showSideBar, setSetshowSideBar] = useState<boolean>(false);
  return (
    <div className="absolute top-0 w-full z-40 py-2 mt-2">
      <div className="flex">
        {/* SideBar btn panel */}
        <button
          className={cn('p-3 ml-4 bg-[#F1F0FF] shadow-md rounded-lg h-1/2 ', {
            'focus:border-sky-700 border mr-[-1px]': showSideBar,
          })}
          onClick={() => setSetshowSideBar((prev) => !prev)}
        >
          {/* -1px so that tool panel don't wobble/move */}
          <List size={18} />
        </button>

        {/* Tool panel */}
        <div className="flex border shadow-md py-1 px-2 justify-center items-center w-fit mx-auto rounded-lg gap-1 bg-white">
          <Tool icon={Cursor} onClick={() => updateAction('Cursor')} />
          <Tool icon={Rectangle} onClick={() => updateAction('Rectangle')} />
          <Tool icon={Diamond} onClick={() => updateAction('Diamond')} />
          <Tool icon={Circle} onClick={() => updateAction('Circle')} />
          <Tool icon={ArrowRight} onClick={() => updateAction('ArrowRight')} />
          <Tool icon={Minus} onClick={() => updateAction('Minus')} />
          <Tool
            icon={PencilSimpleLine}
            onClick={() => updateAction('PencilSimpleLine')}
          />
          <Tool icon={TextAa} onClick={() => updateAction('TextAa')} />
          <Tool icon={Eraser} onClick={() => updateAction('Eraser')} />
        </div>
      </div>
      {/* sidebar */}
      {showSideBar && <SideBar />}
    </div>
  );
};

export default Panel;
