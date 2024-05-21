import {
  ArrowRight,
  Circle,
  Cursor,
  Diamond,
  Eraser,
  Image,
  Minus,
  PencilSimpleLine,
  Rectangle,
  TextAa,
} from '@phosphor-icons/react';
import Tool from './Tool';
import {useToolStore} from '../../store/store';

const Panel = () => {
  const updateAction = useToolStore((state) => state.updateAction);

  return (
    <div className="absolute top-0 w-full z-40 py-2 mt-2">
      <div className=" flex border shadow-md py-1 px-2 justify-center items-center w-fit mx-auto rounded-lg gap-1">
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
        <Tool icon={Image} onClick={() => updateAction('Image')} />
        <Tool icon={Eraser} onClick={() => updateAction('Eraser')} />
      </div>
    </div>
  );
};

export default Panel;
