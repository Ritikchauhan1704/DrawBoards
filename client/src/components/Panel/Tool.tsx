import { Icon } from '@phosphor-icons/react';
import {cn} from '../../libs/utils';
import {useToolStore} from '../../store/store';

interface ToolProps {
  icon: Icon;
  onClick: () => void;
}
const Tool = ({icon: Icon, onClick}: ToolProps) => {
  const action = useToolStore((state) => state.action);

  return (

    // onclick change bg color of btn
    <button
      className={cn('p-3 rounded-lg ', {
        'bg-[#E0DFFF]': action === Icon.displayName,
        'hover:bg-[#F1F0FF]': action !== Icon.displayName,
      })}
      onClick={onClick}
    >
      <Icon size={18} weight="light" />
    </button>
  );
};

export default Tool;
