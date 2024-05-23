import {Image, Layer, Rect, Stage} from 'react-konva';
import {Panel} from './components';
import {useExportImage, useImportImage} from './store/store';
import {useRef} from 'react';

function App() {
  const image = useImportImage((state) => state.image);

  const stageRef = useRef<any>(null);
  const updateRef = useExportImage((stage) => stage.updateRef);
  if (stageRef) {
    updateRef(stageRef);
  }

  // const onExportClic
  return (
    <div className=" flex relative h-screen w-screen">
      <Panel />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
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
              x={0}
              y={0}
              height={image.height}
              width={image.width}
              draggable={true}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
