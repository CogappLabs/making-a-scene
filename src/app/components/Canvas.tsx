import { useEffect, useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import UrlImage from './UrlImage';
import Konva from 'konva';
import node from 'postcss/lib/node';
import { HSL } from 'konva/lib/filters/HSL';
import { RGBA } from 'konva/lib/filters/RGBA';

const CANVAS_VIRTUAL_WIDTH = 1232;
const CANVAS_VIRTUAL_HEIGHT = 928;

const Canvas = (
    {
      dragUrl,
      setDragUrl,
      images,
      setImages,
      onDropHandler,
      forwardedRef
    },
  ) => {

  const divRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: CANVAS_VIRTUAL_WIDTH,
    height: CANVAS_VIRTUAL_HEIGHT,
  });
  const [selectedId, setSelectedId] = useState(null);
  const [scale, setScale] = useState(1);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  // Intiially set the size of the canvas to the size of the parent div.
  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setSize({
        width: Math.min(divRef.current.offsetWidth, CANVAS_VIRTUAL_WIDTH),
        height: Math.min(divRef.current.offsetHeight, CANVAS_VIRTUAL_HEIGHT),
      });
    }
  }, []);

  // Update the size of the canvas when the window is resized.
  useEffect(() => {
    const checkSize = () => {
      if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
        setSize({
          width: Math.min(divRef.current.offsetWidth, CANVAS_VIRTUAL_WIDTH),
          height: Math.min(divRef.current.offsetHeight, CANVAS_VIRTUAL_HEIGHT),
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
    const deleteSelectedImage = () => {
      if (selectedId === null) {
        return;
      }
      setImages(images.filter((image) => image.id !== selectedId));
      setSelectedId(null);
    };

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
  }, [selectedId, images, setImages]);

  const toggleControls = (visible) => {
    const newImages = images.map((image) => {
      return {
        ...image,
        showControls: visible,
      }
    })
    setImages(newImages);
  };

  return (
    <div
      ref={divRef}
      className="h-full w-full"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        forwardedRef.current.setPointersPositions(e);
        onDropHandler(dragUrl, forwardedRef.current.getPointerPosition());
        setDragUrl(null);
      }}
    >
      <Stage
        className="flex justify-center"
        ref={forwardedRef}
        width={size.width}
        height={size.height}
        scaleX={scale}
        scaleY={scale}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        onMouseEnter={() => toggleControls(true)}
        onMouseLeave={() => toggleControls(false)}
      >
        <Layer>
          {images.map((image, index) => (
            <UrlImage
              key={index}
              interactable={index > 0}
              shapeProps={image}
              showControls={image.showControls}
              onSelect={() => {
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
