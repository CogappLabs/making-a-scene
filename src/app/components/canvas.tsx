import {
  Key,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Image as KonvaImage, Stage, Layer } from 'react-konva';
import UrlImage from './UrlImage';
import useImage from 'use-image';

import type { Stage as StageType } from 'konva/lib/Stage';

const BackgroundLayer = ({ image }) => {
  const [img] = useImage(image.src);
  return <KonvaImage image={img} />;
};

const CANVAS_VIRTUAL_WIDTH = 1232;
const CANVAS_VIRTUAL_HEIGHT = 928;

const Canvas = forwardRef(
  (
    { dragUrl, setDragUrl, images, setImages, onDropHandler, backgroundLayerImage },
    forwardedRef
  ) => {
    const stageRef = useRef<StageType>(null);
    const divRef = useRef(null);
    const backgroundLayerRef = useRef(null);

    const [size, setSize] = useState({ width: 0, height: 0 });
    const [selectedId, setSelectedId] = useState(null);

    // const [anchors, setAnchors] = useState([
    //   { x: 30, y: 30 },
    //   { x: width - 50, y: 50 },
    //   { x: width - 70, y: height - 30 },
    //   { x: 10, y: height },
    // ]);

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

    useImperativeHandle(
      forwardedRef,
      () => {
        return {
          downloadImage() {
            const stage = stageRef.current?.getStage();
            if (!stage) {
              console.error('Error generating image download.');
              return;
            }

            const dataURL = stage.toDataURL({
              pixelRatio: 1,
              mimeType: 'image/jpeg',
            });

            var link = document.createElement('a');
            link.download = 'filename.jpeg';
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          },
        };
      },
      []
    );

    const checkDeselect = (e) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      const clickedOnBackground = e.target.getLayer().name() === 'backgroundLayer';
      if (clickedOnEmpty || clickedOnBackground) {
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

    // Brings the currently selected item to the front of the array.
    const handleBringToFront = (id) => {
      // If image is already at the front of the array, do nothing.
      if (images[images.length - 1].id === id) {
        return;
      }

      // Reorder so that the dragged image is at the end of the array.
      const others = images.filter((image) => image.id !== id);
      const selected = images.find((image) => image.id === id);
      setSelectedId(null);

      setImages([
        ...others,
        selected,
      ])

      setSelectedId(selected.id);
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
      const handleKeyDown = (e: { key: string }) => {
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
          console.log('e', e);
          e.preventDefault();
          stageRef?.current?.setPointersPositions(e);
          onDropHandler(dragUrl, stageRef?.current?.getPointerPosition());
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
          <Layer name="backgroundLayer">
            <BackgroundLayer image={backgroundLayerImage} />
          </Layer>
          <Layer>
            {images.map((image: { id: SetStateAction<null> }, index: Key | null | undefined) => (
              <UrlImage
                key={index}
                shapeProps={image}
                isSelected={image.id === selectedId}
                handleSelect={() => {
                  setSelectedId(image.id);
                  // Bring the selected image to the front of the array.
                  handleBringToFront(image.id);
                }}
                handleChange={(newAttrs: any) => {
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
  }
);

// Have to explicitly set the display name when using forwardRef
// see https://github.com/jsx-eslint/eslint-plugin-react/issues/2269.
Canvas.displayName = 'Canvas';

export default Canvas;
