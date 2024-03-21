import { useEffect, useRef } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';

import useImage from 'use-image';

const UrlImage = ({ shapeProps, isSelected, handleSelect, handleChange }) => {
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
        onClick={() => handleSelect(image.id)}
        onTap={() => handleSelect(image.id)}
        onDragEnd={(e) => {
          handleChange({
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
          handleChange({
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

export default UrlImage;
