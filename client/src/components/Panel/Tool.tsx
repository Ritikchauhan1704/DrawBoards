import {useToolStore} from '../../store/store';

interface ToolProps {
  icon: any;
  onClick: () => void;
}
const Tool = ({icon: Icon, onClick}: ToolProps) => {
  const action = useToolStore((state) => state.action);

  let clas = '';
  if (action === Icon.displayName) {
    clas = 'bg-[#E0DFFF]';
  } else {
    clas = 'hover:bg-[#F1F0FF]';
  }

  return (
    <button className={`p-3 rounded-lg ` + clas} onClick={onClick}>
      <Icon size={18} weight="light" />
    </button>
  );
};

export default Tool;
