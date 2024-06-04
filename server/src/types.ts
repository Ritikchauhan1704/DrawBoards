type Shape = {
  id: string;
  type: string;
  color: string;
  x?: number;
  y?: number;
};
type Rectangle = Shape & {
  width: number;
  height: number;
  x: number;
  y: number;
};
type Circle = Shape & {
  radius: number;
  x: number;
  y: number;
};
type Scribble = Shape & {
  points: number[];
};
type Arrow = Shape & {
  points: [number, number, number, number];
};
type Line = Shape & {
  points: [number, number, number, number];
};
type Text = Shape & {
  text: string | null;
};

export type AllShapes = Rectangle | Circle | Scribble | Arrow | Line | Text;
