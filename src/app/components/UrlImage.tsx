import { useRef, useEffect } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { Image as ImageType } from 'konva/lib/shapes/Image';

import useImage from 'use-image';

export default function UrlImage({ shapeProps, showControls, onSelect, onChange, interactable }) {
  const image = shapeProps;
  const [img] = useImage(image.src);
  const shapeRef = useRef<ImageType>(null);
  const transformerRef = useRef<TransformerType>(null);

  useEffect(() => {
    console.log(showControls)
    if (!transformerRef.current) {
      return;
    }

    if (showControls && interactable) {
      if (shapeRef.current) {
        transformerRef.current.nodes([shapeRef.current]);
        const layer = transformerRef.current.getLayer();
        if (layer) {
          layer.batchDraw();
        }
      }
    }
  }, [interactable, showControls]);

  // not pretty but it works.
  useEffect(() => {
    if (!transformerRef.current) {
      return;
    }
    transformerRef.current.forceUpdate();
  })

  return (
    <>
      <KonvaImage
        ref={shapeRef}
        {...shapeProps}
        draggable={interactable}
        image={img}
        onMouseEnter={(e) => {
          if (interactable) {
            e.target.getStage().container().style.cursor = 'move';
          }
        }}
        onMouseLeave={(e) => {
          e.target.getStage().container().style.cursor = 'default';
        }}
        x={image.x}
        y={image.y}
        onClick={onSelect}
        onTap={onSelect}
        onDragMove={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          if (!shapeRef.current) {
            return;
          }
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {showControls && (
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
