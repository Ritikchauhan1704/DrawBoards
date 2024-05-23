import {create} from 'zustand';

type ToolStore = {
  action: string;
  updateAction:(action:string)=>void
};
type ImportImage = {
  image: HTMLImageElement|null;
  updateImage:(image:HTMLImageElement)=>void
};
type ExportImage = {
  ref: React.MutableRefObject<any>|null;
  updateRef:(ref:React.MutableRefObject<any>)=>void
};

export const useToolStore = create<ToolStore>((set) => ({
  action: 'Cursor',
  updateAction: (action:string) => set(() => ({action: action})),
}));

export const useImportImage=create<ImportImage>((set)=>({
  image:null,
  updateImage: (image:HTMLImageElement) => set(() => ({image:image})),
}))
export const useExportImage=create<ExportImage>((set)=>({
  ref:null,
  updateRef: (ref:React.MutableRefObject<null>) => set(() => ({ref:ref})),
}))