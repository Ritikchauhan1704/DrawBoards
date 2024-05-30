export type Shape = {
  id: string;
  color: string;
  x?: number;
  y?: number;
};

export type Rectangle = Shape & {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type Circle = Shape & {
  radius: number;
  x: number;
  y: number;
};

export type Scribble = Shape & {
  points: number[];
};

export type Arrow = Shape & {
  points: [number, number, number, number];
};
export type Line = Shape & {
  points: [number, number, number, number];
};
export type Text = Shape & {
  text: string;
};
export type Eraser = {
  x: number;
  y: number;
};
