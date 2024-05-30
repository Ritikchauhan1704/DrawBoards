import {
  Arrow as KonvaArrow,
  Rect as KonvaRect,
  Image,
  Layer,
  Stage,
  Transformer,
  Circle as KonvaCircle,
  Line as KonvaLine,
  Text as KonvaText,
} from 'react-konva';
import {KonvaEventObject} from 'konva/lib/Node';
import {CreateRoom, JoinRoom, Panel} from './components';
import {
  useExportImage,
  useImportImage,
  useRoom,
  useToolStore,
} from './store/store';
import {useCallback, useRef, useState} from 'react';
import {
  Arrow,
  Circle,
  Eraser,
  Line,
  Rectangle,
  Scribble,
  Text,
} from './CanvaTypes/CanvaTypes';
import {v4 as uuidv4} from 'uuid';
import {cn} from './libs/utils';
import {Toaster} from 'react-hot-toast';
import { X } from '@phosphor-icons/react';

function App() {
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [rect, setRect] = useState<Rectangle[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [scribbles, setScribbles] = useState<Scribble[]>([]);
  const [texts, setTexts] = useState<Text[]>([]);
  const [eraserPoints, setEraserPoints] = useState<Eraser[]>([]);

  const [color, setColor] = useState('#000');

  const action = useToolStore((stage) => stage.action);
  const updateAction = useToolStore((stage) => stage.updateAction);

  const isDraggable = action === 'Cursor';
  //importing image from store to render it in canvas
  const image = useImportImage((state) => state.image);

  // giving ref to stage and storing it in store for use in other compnent
  const stageRef = useRef<any>(null);
  const updateRef = useExportImage((stage) => stage.updateRef);
  if (stageRef) {
    updateRef(stageRef);
  }

  //using useref so not re render again
  const isDraw = useRef(false);

  const onStageMouseUp = useCallback(() => {
    isDraw.current = false;
    if (action === 'PencilSimpleLine') return;
    updateAction('Cursor');
  }, [updateAction, action]);

  const currentShapeRef = useRef<string>();

  const onStageMouseDown = useCallback(() => {
    if (action === 'Cursor') return;
    isDraw.current = true;
    const stage = stageRef?.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;
    const id = uuidv4();
    currentShapeRef.current = id;
    switch (action) {
      case 'ArrowRight':
        setArrows((prevArrows) => [
          ...prevArrows,
          {
            id,
            points: [x, y, x, y],
            color,
          },
        ]);
        break;
      case 'Rectangle':
        setRect((prevRect) => [
          ...prevRect,
          {
            id,
            color,
            x,
            y,
            height: 1,
            width: 1,
          },
        ]);
        break;
      case 'Diamond':
        break;
      case 'Circle':
        setCircles((prevCircle) => [
          ...prevCircle,
          {
            id,
            radius: 1,
            x,
            y,
            color,
          },
        ]);
        break;
      case 'Minus':
        setLines((prevLines) => [
          ...prevLines,
          {
            id,
            points: [x, y, x, y],
            color,
          },
        ]);
        break;
      case 'PencilSimpleLine':
        setScribbles((prevScribble) => [
          ...prevScribble,
          {id, color, points: [x, y]},
        ]);
        break;
      case 'TextAa': {
        const text: string = prompt('Type here');
        setTexts((prevTexts) => [...prevTexts, {id, x, y, color, text: text}]);
        onStageMouseUp();
        break;
      }
      case 'Eraser':
        setEraserPoints([{x, y}]);
        break;
    }
  }, [action, color, onStageMouseUp]);

  const onStageMouseMove = useCallback(() => {
    if (action === 'Cursor' || !isDraw.current) return;
    const stage = stageRef?.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;
    const id = currentShapeRef.current;
    switch (action) {
      case 'ArrowRight':
        setArrows((prevArrows) =>
          prevArrows.map((prevArrow) =>
            prevArrow.id === id
              ? {
                  ...prevArrow,
                  points: [prevArrow.points[0], prevArrow.points[1], x, y],
                }
              : prevArrow
          )
        );
        break;
      case 'Rectangle':
        setRect((prevRect) =>
          prevRect.map((rect) =>
            rect.id === id
              ? {...rect, height: y - rect.y, width: x - rect.x}
              : rect
          )
        );
        break;
      case 'Diamond':
        break;
      case 'Circle':
        setCircles((prevCircles) =>
          prevCircles.map((prevCircle) =>
            prevCircle.id === id
              ? {
                  ...prevCircle,
                  radius:
                    ((x - prevCircle.x) ** 2 + (y - prevCircle.y) ** 2) ** 0.5,
                }
              : prevCircle
          )
        );
        break;
      case 'Minus':
        setLines((prevLines) =>
          prevLines.map((prevLine) =>
            prevLine.id === id
              ? {
                  ...prevLine,
                  points: [prevLine.points[0], prevLine.points[1], x, y],
                }
              : prevLine
          )
        );
        break;
      case 'PencilSimpleLine':
        setScribbles((prevScibbles) =>
          prevScibbles.map((prevScibble) =>
            prevScibble.id === id
              ? {...prevScibble, points: [...prevScibble.points, x, y]}
              : prevScibble
          )
        );
        break;
      case 'Eraser':
        setEraserPoints((prev) => [...prev, {x, y}]);
        console.log(eraserPoints);

        break;
    }
  }, [action, eraserPoints]);

  const transformerRef = useRef<any>(null);

  const onShapeClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (action !== 'Cursor') return;
      const currentTarget = e.currentTarget;
      transformerRef?.current?.node(currentTarget);
    },
    [action]
  );

  const onClear = useCallback(() => {
    setRect([]);
    setCircles([]);
    setScribbles([]);
    setArrows([]);
    setLines([]);
    setTexts([]);
  }, []);

  const room = useRoom((stage) => stage.room);
  const updateRoom = useRoom((stage) => stage.updateRoom);
  const onBgClick = useCallback(() => {
    transformerRef?.current?.nodes([]);
  }, []);

  return (
    <div
      className={cn('flex relative h-screen w-screen', {
        'cursor-crosshair': action != 'Cursor',
      })}
    >
      <div onClick={onBgClick}>
        <Panel />
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        onMouseUp={onStageMouseUp}
        onMouseDown={onStageMouseDown}
        onMouseMove={onStageMouseMove}
      >
        <Layer>
          <KonvaRect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            fill="white"
            id="bg"
            onClick={onBgClick}
          />
          {image && (
            <Image
              image={image}
              x={window.innerWidth / 2}
              y={window.innerHeight / 2}
              height={image.height}
              width={image.width}
              draggable={isDraggable}
              onClick={onShapeClick}
            />
          )}
          {arrows.map((arrow) => (
            <KonvaArrow
              key={arrow.id}
              id={arrow.id}
              points={arrow.points}
              fill={arrow.color}
              stroke={arrow.color}
              strokeWidth={3}
              draggable={isDraggable}
              onClick={onShapeClick}
            />
          ))}
          {rect.map((rect) => (
            <KonvaRect
              key={rect.id}
              id={rect.id}
              x={rect.x}
              y={rect.y}
              height={rect.height}
              width={rect.width}
              stroke={rect.color}
              strokeWidth={3}
              draggable={isDraggable}
              onClick={onShapeClick}
            />
          ))}
          {circles.map((circle) => (
            <KonvaCircle
              key={circle.id}
              id={circle.id}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              stroke={circle.color}
              strokeWidth={3}
              draggable={isDraggable}
              onClick={onShapeClick}
            />
          ))}
          {lines.map((line) => (
            <KonvaLine
              key={line.id}
              id={line.id}
              points={line.points}
              fill={line.color}
              stroke={line.color}
              strokeWidth={3}
              draggable={isDraggable}
              onClick={onShapeClick}
            />
          ))}
          {scribbles.map((scribble) => (
            <KonvaLine
              key={scribble.id}
              id={scribble.id}
              lineCap="round"
              lineJoin="round"
              stroke={scribble.color}
              strokeWidth={4}
              points={scribble.points}
              onClick={onShapeClick}
              draggable={isDraggable}
            />
          ))}
          {texts.map((text) => (
            <KonvaText
              key={text.id}
              id={text.id}
              text={text.text}
              x={text.x}
              y={text.y}
              fontSize={15}
              draggable={isDraggable}
              onClick={onShapeClick}
            />
          ))}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
      {room && (
        <div className="absolute top-36 right-80  h-[70%] w-1/2 flex flex-col border shadow-md py-1 px-2 justify-center items-center mx-auto rounded-lg bg-white">
          <button className='absolute top-5 right-5' onClick={()=>updateRoom(null)}>
            <X size={20} />
          </button>


          {room == 'Join' ? <JoinRoom /> : <CreateRoom />}
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
