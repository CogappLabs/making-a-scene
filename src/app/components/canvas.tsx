import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image, Transformer } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const image = shapeProps;
  const [img] = useImage(image.src);
  const shapeRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        image={img}
        x={image.x}
        y={image.y}
        // offsetX={img ? img.width / 2 : 0}
        // offsetY={img ? img.height / 2 : 0}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // // limit resize
            // if (newBox.width < 5 || newBox.height < 5) {
            //   return oldBox;
            // }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const BgImage = ({}) => {
  const [img] = useImage('https://makescene.s3.eu-west-1.amazonaws.com/room-1.png');
  return (
    <Image
      image={img}
    />
  );
}

const Canvas = ({ dragUrl, setDragUrl }) => {
  const stageRef = useRef();
  const divRef = useRef();
  const [images, setImages] = useState([]);
  const [size, setSize] = useState({ width: 800, height: 831 });
  const [selectedId, setSelectedId] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  // Can't seem to get canvas to fit window for some reason...
  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setSize({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <div
      className="flex justify-center"
      ref={divRef}
      onDrop={(e) => {
        e.preventDefault();
        stageRef.current.setPointersPositions(e);
        setImages(
          images.concat([
            {
              ...stageRef.current.getPointerPosition(),
              src: dragUrl,
              id: dragUrl
            },
          ])
        );
        setDragUrl(null);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        ref={stageRef}
        style={{ width: size.width, height: size.height }}
        className="border-black border-4"
      >
        <Layer>
          {/* <BgImage /> */}
          {images.map((image, index) => (
            <URLImage
              key={index}
              shapeProps={image}
              isSelected={image.id === selectedId}
              onSelect={() => {
                console.log(image);
                setSelectedId(image.id);
              }}
              onChange={(newAttrs) => {
                const newimages = images.slice();
                newimages[index] = newAttrs;
                setImages(newimages);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
