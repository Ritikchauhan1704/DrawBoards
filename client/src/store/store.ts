import {create} from 'zustand';

type ToolStore = {
  action: string;
  updateAction:(action:string)=>void
};

export const useToolStore = create<ToolStore>((set) => ({
  action: 'Cursor',
  updateAction: (action:string) => set(() => ({action: action})),
}));
