// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ shapeProps, isSelected, onSelect, onChange, interactable }) => {
  const image = shapeProps;
  const [img] = useImage(image.src);
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected && interactable) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        ref={shapeRef}
        {...shapeProps}
        draggable={interactable}
        image={img}
        x={image.x}
        y={image.y}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
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
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const CANVAS_VIRTUAL_WIDTH = 1232;
const CANVAS_VIRTUAL_HEIGHT = 928;

const Canvas = ({ dragUrl, setDragUrl, images, setImages, onDropHandler, backgroundUrl }) => {
  const stageRef = useRef();
  const divRef = useRef();
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [selectedId, setSelectedId] = useState(null);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const deleteSelectedImage = () => {
    if (selectedId === null) {
      return;
    }
    setImages(images.filter((image) => image.id !== selectedId));
    setSelectedId(null);
  };

  // Intiially set the size of the canvas to the size of the parent div.
  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setSize({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  // Update the size of the canvas when the window is resized.
  useEffect(() => {
    const checkSize = () => {
      if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
        setSize({
          width: divRef.current.offsetWidth,
          height: divRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  // Event listener for keydown events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        deleteSelectedImage();
      }
    };

    // Attach the event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId, images]);

  const scale = Math.min(
    divRef.current?.offsetWidth / CANVAS_VIRTUAL_WIDTH,
    divRef.current?.offsetHeight / CANVAS_VIRTUAL_HEIGHT
  );

  return (
    <div
      ref={divRef}
      className="h-full w-full bg-contain bg-center bg-no-repeat"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        stageRef.current.setPointersPositions(e);
        onDropHandler(dragUrl, stageRef.current.getPointerPosition());
        setDragUrl(null);
      }}
    >
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        scaleX={scale}
        scaleY={scale}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {images.map((image, index) => (
            <URLImage
              key={index}
              interactable={index > 0}
              shapeProps={image}
              isSelected={image.id === selectedId}
              onSelect={() => {
                setSelectedId(image.id);
              }}
              onChange={(newAttrs) => {
                const newimages = images.slice();
                newimages[index] = newAttrs;
                setImages(newimages);
                console.log('change', image);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
