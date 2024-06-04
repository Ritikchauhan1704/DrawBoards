import {useCallback, useEffect, useRef, useState} from 'react';
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
import {
  useExportImage,
  useImportImage,
  useToolStore,
} from '../../store/store';
import {KonvaEventObject} from 'konva/lib/Node';
import {v4 as uuidv4} from 'uuid';
// import {AllShapes} from '../../CanvaTypes/CanvaTypes';
import socket from '../../socket/socket';

const Whiteboard = ({allShapes,setAllShapes}) => {
  const [color, setColor] = useState('#000');

  // const data=useCanvasData(stage=>stage.data)
  // giving ref to stage and storing it in store for use in other compnent

  const stageRef = useRef<any>(null);
  const updateRef = useExportImage((stage) => stage.updateRef);

  if (stageRef) {
    updateRef(stageRef);
  }

  //using useref so not re render again
  const isDraw = useRef(false);

  const action = useToolStore((stage) => stage.action);
  const updateAction = useToolStore((stage) => stage.updateAction);

  const isDraggable = action === 'Cursor';
  //importing image from store to render it in canvas
  const image = useImportImage((state) => state.image);

  const onStageMouseUp = useCallback(() => {
    isDraw.current = false;
    if (action === 'PencilSimpleLine') return;
    updateAction('Cursor');
    socket.emit('senderCanvaData', allShapes[allShapes.length - 1]);
    // console.log(circles);
  }, [updateAction, action, allShapes]);

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
        setAllShapes((prevArrow) => [
          ...prevArrow,
          {
            id,
            points: [x, y, x, y],
            color,
            type: 'arrow',
          },
        ]);
        break;
      case 'Rectangle':
        setAllShapes((prevRect) => [
          ...prevRect,
          {
            id,
            color,
            x,
            y,
            height: 1,
            width: 1,
            type: 'rect',
          },
        ]);
        break;
      case 'Diamond':
        break;
      case 'Circle':
        setAllShapes((prevCircle) => [
          ...prevCircle,
          {
            id,
            radius: 1,
            x,
            y,
            color,
            type: 'circle',
          },
        ]);
        break;
      case 'Minus':
        setAllShapes((prevLines) => [
          ...prevLines,
          {
            id,
            points: [x, y, x, y],
            color,
            type: 'line',
          },
        ]);
        break;
      case 'PencilSimpleLine':
        setAllShapes((prevScribble) => [
          ...prevScribble,
          {id, color, points: [x, y], type: 'scribble'},
        ]);
        break;
      case 'TextAa': {
        const text: string | null = prompt('Type here');
        setAllShapes((prevTexts) => [
          ...prevTexts,
          {id, x, y, color, text: text, type: 'text'},
        ]);
        onStageMouseUp();
        break;
      }
      case 'Eraser':
        // setEraserPoints([{x, y}]);
        break;
    }
  }, [action, color, onStageMouseUp, setAllShapes]);

  const onStageMouseMove = useCallback(() => {
    if (action === 'Cursor' || !isDraw.current) return;
    const stage = stageRef?.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;
    const id = currentShapeRef.current;
    switch (action) {
      case 'ArrowRight':
        setAllShapes((prevArrows) =>
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
        setAllShapes((prevRect) =>
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
        setAllShapes((prevCircles) =>
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
        setAllShapes((prevLines) =>
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
        setAllShapes((prevScibbles) =>
          prevScibbles.map((prevScibble) =>
            prevScibble.id === id
              ? {...prevScibble, points: [...prevScibble.points, x, y]}
              : prevScibble
          )
        );
        break;
      case 'Eraser':
        break;
    }
  }, [action, setAllShapes]);

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
    setAllShapes([]);
  }, [setAllShapes]);

  const onBgClick = useCallback(() => {
    transformerRef?.current?.nodes([]);
  }, []);

  // useEffect(() => {
  //   updateData(allShapes);
  //   // console.log(data);
  // },[allShapes,updateData]);
  return (
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
        {allShapes.map(
          (arrow) =>
            arrow.type === 'arrow' && (
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
            )
        )}
        {allShapes.map(
          (rect) =>
            rect.type === 'rect' && (
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
            )
        )}
        {allShapes.map(
          (circle) =>
            circle.type === 'circle' && (
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
            )
        )}
        {allShapes.map(
          (line) =>
            line.type === 'line' && (
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
            )
        )}
        {allShapes.map(
          (scribble) =>
            scribble.type === 'scribble' && (
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
            )
        )}
        {allShapes.map(
          (text) =>
            text.type === 'text' && (
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
            )
        )}
        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
};

export default Whiteboard;
