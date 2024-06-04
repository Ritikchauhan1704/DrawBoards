import {
  ArrowRight,
  Circle,
  Cursor,
  Diamond,
  Eraser,
  Icon,
  List,
  Minus,
  PencilSimpleLine,
  Rectangle,
  TextAa,
} from '@phosphor-icons/react';

import Tool from './Tool';
import {useState} from 'react';
import SideBar from './SideBar/SideBar';
import {cn} from '../../libs/utils';
import {useToolStore} from '../../store/store';

type toolsType = {
  icon: Icon;
  onclick: () => void;
};

const Panel = () => {
  const updateAction = useToolStore((state) => state.updateAction);
  const [showSideBar, setSetshowSideBar] = useState<boolean>(false);

  //Tools on panel
  const tools: toolsType[] = [
    {icon: Cursor, onclick: () => updateAction('Cursor')},
    {icon: Rectangle, onclick: () => updateAction('Rectangle')},
    {icon: Diamond, onclick: () => updateAction('Diamond')},
    {icon: Circle, onclick: () => updateAction('Circle')},
    {icon: ArrowRight, onclick: () => updateAction('ArrowRight')},
    {icon: Minus, onclick: () => updateAction('Minus')},
    {icon: PencilSimpleLine, onclick: () => updateAction('PencilSimpleLine')},
    {icon: TextAa, onclick: () => updateAction('TextAa')},
    {icon: Eraser, onclick: () => updateAction('Eraser')},
  ];

  return (
    <div className="absolute top-0 w-full z-40 py-2 mt-2">
      <div className="flex">
        {/* SideBar btn panel */}
        <button
          className={cn('p-3 ml-4 bg-[#F1F0FF] shadow-md rounded-lg h-1/2 ', {
            // -1px so that tool panel don't wobble/move
            'focus:border-sky-700 border mr-[-1px]': showSideBar,
          })}
          onClick={() => setSetshowSideBar((prev) => !prev)}
        >
          <List size={18} />
        </button>

        {/* Tool panel */}
        <div className="flex border shadow-md py-1 px-2 justify-center items-center w-fit mx-auto rounded-lg gap-1 bg-white">
          {tools.map((tool, i) => (
            <Tool key={i} icon={tool.icon} onClick={tool.onclick} />
          ))}
        </div>
      </div>
      {/* sidebar */}
      {showSideBar && <SideBar />}
    </div>
  );
};

export default Panel;
