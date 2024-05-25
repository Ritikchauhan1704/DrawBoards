import {
  Arrow as KonvaArrow,
  Rect as KonvaRect,
  Image,
  Layer,
  Rect,
  Stage,
  Transformer,
} from 'react-konva';
import {Panel} from './components';
import {useExportImage, useImportImage, useToolStore} from './store/store';
import {useCallback, useRef, useState} from 'react';
import {Arrow, Rectangle} from './CanvaTypes/CanvaTypes';
import {v4 as uuidv4} from 'uuid';
import {KonvaEventObject} from 'konva/lib/Node';
function App() {
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [rect, setRect] = useState<Rectangle[]>([]);
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
    updateAction('Cursor');
  }, [updateAction]);

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
        break;
      case 'Minus':
        break;
      case 'PencilSimpleLine':
        break;
      case 'TextAa':
        break;
      case 'Eraser':
        break;
    }
  }, [action, color]);

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
        break;
      case 'Minus':
        break;
      case 'PencilSimpleLine':
        break;
      case 'TextAa':
        break;
      case 'Eraser':
        break;
    }
  }, [action]);

  const transformerRef = useRef<any>(null);
  const onShapeClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (action !== 'Cursor') return;
      const currentTarget = e.currentTarget;
      transformerRef?.current?.node(currentTarget);
    },
    [action]
  );

  return (
    <div className=" flex relative h-screen w-screen">
      <Panel />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        onMouseUp={onStageMouseUp}
        onMouseDown={onStageMouseDown}
        onMouseMove={onStageMouseMove}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            fill="white"
            id="bg"
          />
          {image && (
            <Image
              image={image}
              x={window.innerWidth / 2}
              y={window.innerHeight / 2}
              height={image.height}
              width={image.width}
              draggable={isDraggable}
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

          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
