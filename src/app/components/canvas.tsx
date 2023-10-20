import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      draggable
      image={img}
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
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

const Canvas = ({ dragUrl, setDragUrl, backgroundImage }) => {
  const stageRef = useRef();
  const divRef = useRef();
  const [images, setImages] = useState([]);
  const [size, setSize] = useState({ width: 800, height: 831 });

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
            },
          ])
        );
        setDragUrl(null);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
    <Stage width={window.innerWidth} height={window.innerHeight}
        ref={stageRef}
        // style={{ width: size.width, height: size.height }}
        className="border-black border-4">
        <Layer>
          <BgImage />
          {images.map((image, index) => (
            <URLImage key={index} image={image} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
