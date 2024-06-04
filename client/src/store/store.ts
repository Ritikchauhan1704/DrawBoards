import {create} from 'zustand';
import {AllShapes} from '../CanvaTypes/CanvaTypes';
type ToolStore = {
  action: string;
  updateAction: (action: string) => void;
};
type ImportImage = {
  image: HTMLImageElement | null;
  updateImage: (image: HTMLImageElement) => void;
};
type ExportImage = {
  ref: React.MutableRefObject<any> | null;
  updateRef: (ref: React.MutableRefObject<any>) => void;
};
type Room = {
  room: string | null;
  updateRoom: (room: string | null) => void;
};

type CanvaData = {
  data: AllShapes[] | [];
  updateData: (data: AllShapes[] | []) => void;
};

export const useToolStore = create<ToolStore>((set) => ({
  action: 'Cursor',
  updateAction: (action: string) => set(() => ({action: action})),
}));

export const useImportImage = create<ImportImage>((set) => ({
  image: null,
  updateImage: (image: HTMLImageElement) => set(() => ({image: image})),
}));
export const useExportImage = create<ExportImage>((set) => ({
  ref: null,
  updateRef: (ref: React.MutableRefObject<null>) => set(() => ({ref: ref})),
}));

export const useRoom = create<Room>((set) => ({
  room: null,
  updateRoom: (room: string | null) => set(() => ({room})),
}));

// const getData:AllShapes[] = async() => {
//   const res=fetch('http://localhost:3000/data')
//   const data=(await res).json
// };

export const useCanvasData = create<CanvaData>((set) => ({
  data: [],
  updateData: (data: AllShapes[] | []) => set(() => ({data})),
}));
