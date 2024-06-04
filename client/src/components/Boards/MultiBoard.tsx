import {useToolStore} from '../../store/store';
import {cn} from '../../libs/utils';
import Panel from '../Panel/Panel';
import Whiteboard from '../Canvas/Whiteboard';

function MultiBoard() {
  const action = useToolStore((stage) => stage.action);

  return (
    <div
      className={cn('flex relative h-screen w-screen', {
        'cursor-crosshair': action != 'Cursor',
      })}
    >
      <Panel />

      <Whiteboard />
    </div>
  );
}

export default MultiBoard;
