import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({shapeProps, isSelected, onSelect, onChange }) => {
  const image = shapeProps;
  const [img] = useImage(image.src);
  const shapeRef = useRef();
  const transformerRef = useRef();

  // useEffect(() => {
  //   if (img && image) {
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d');
  //     const p = new Perspective(ctx, img);
  //     console.log(p);
  // //     // Draw the image with perspective transformation
  //     // p.draw({
  //     //   topLeftX: 0,
  //     //   topLeftY: 0,
  //     //   topRightX: 100,
  //     //   topRightY: 0,
  //     //   bottomRightX: 100,
  //     //   bottomRightY: 100,
  //     //   bottomLeftX: 0,
  //     //   bottomLeftY: 100,
  //     // });

  // //     // Trigger a Konva update by setting the image source to the canvas data
  //     // const dataURL = canvas.toDataURL();
  //     // image.src = dataURL;
  //     // shapeRef.current.getLayer().batchDraw();
  //   }
  // }, [image]);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        ref={shapeRef}
        {...shapeProps}
        draggable
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
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale
          // on transform end.
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

// const warp = (img: HTMLImageElement) => {
//   let cnv = document.createElement('canvas');
//   let ctx = cnv.getContext('2d');

//   if (ctx === null) {
//     console.log('ctx is null');
//     return;
//   }

//   const p = new Perspective(ctx, img);
//   const warped = p.draw({
//     topLeftX: 30,
//     topLeftY: 30,
//     topRightX: 462,
//     topRightY: 50,
//     bottomRightX: 442,
//     bottomRightY: 482,
//     bottomLeftX: 10,
//     bottomLeftY: 512,
//   });

//   console.log('warped', warped);
// };

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

  // const [anchors, setAnchors] = useState([
  //   { x: 30, y: 30 },
  //   { x: width - 50, y: 50 },
  //   { x: width - 70, y: height - 30 },
  //   { x: 10, y: height },
  // ]);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
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

  // // Update the size of the canvas when the window is resized.
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
      // style={{ backgroundImage: `url(${backgroundUrl})` }}
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
