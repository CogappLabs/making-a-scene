'use client';

import dynamic from 'next/dynamic';
import { Search } from '@/app/components/Search';
import { FC, ForwardedRef, forwardRef, useRef, useState } from 'react';
import Modal from '@/app/components/Modal';
import SlidingPanel from '@/app/components/SlidingPanel';
import { CameraIcon, PencilIcon } from '@heroicons/react/20/solid';
import Header from '@/app/components/Header';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Stage as StageType } from 'konva/lib/Stage';

const Canvas = dynamic(() => import('@/app/components/Canvas'), {
  ssr: false,
});

interface CanvasProps {
  dragUrl: string | null;
  images: { src: string; id: any; x: number; y: number; }[]
  onDropHandler: Function;
  setDragUrl: Function;
  setImages: Function;
  ref: ForwardedRef<any>;
}

const ForwardRefCanvas: FC<CanvasProps> = forwardRef(function ForwardRefCanvas(props, ref) {
  return <Canvas {...props} forwardedRef={ref} />;
});
ForwardRefCanvas.displayName = 'ForwardRefCanvas';

export default function Page({ params }) {
  const slug = params.slug;
  const bgImageUrl = `/images/room-${slug}.jpeg`;

  const stageRef = useRef<StageType>(null);

  // Modal component is activated by button press
  // in the search component so that state is
  // lifted up to the parent here.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Shared state between search and canvas.
  const [dragUrl, setDragUrl] = useState(null);

  // Shared state between modal and canvas.
  const [selectedObject, setSelectedObject] = useState(null);

  // State for objects on the canvas.
  const [images, setImages] = useState([
    {
      src: bgImageUrl,
      id: uuidv4(),
      x: 0,
      y: 0,
    }
  ]);

  const setImagesHandler = (src, position = { x: 100, y: 100 }) => {
    const newImage = {
      src,
      id: uuidv4(),
      ...position,
      showControls: true,
    };
    setImages(images.concat([newImage]));
  };

  const onModalOpenHandler = (data) => {
    setSelectedObject(data);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (stageRef.current) {
      const activeStage = stageRef.current.getStage();
      if (!activeStage) {
        console.error('Error generating image download.');
        return;
      }

      const dataURL = activeStage.toDataURL({
        pixelRatio: 1,
        mimeType: 'image/png',
      });

      var link = document.createElement('a');
      link.download = 'make-a-scene.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Header>
        <div className="flex gap-4">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-black shadow-sm ring-inset ring-gray-300 hover:bg-black hover:text-green"
            onClick={() => setIsSidebarOpen(true)}
          >
            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add objects
          </button>

          <button
            type="button"
            className="inline-flex items-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-black shadow-sm ring-inset ring-gray-300 hover:bg-black hover:text-green"
            onClick={() => handleSave()}
          >
            <CameraIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Save
          </button>
        </div>
      </Header>

      <main className="pb-8">
        <ForwardRefCanvas
          dragUrl={dragUrl}
          images={images}
          onDropHandler={setImagesHandler}
          setDragUrl={setDragUrl}
          setImages={setImages}
          ref={stageRef}
        />
      </main>

      <SlidingPanel isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}>
        <Search
          onImageDragStart={setDragUrl}
          onInfoButtonClick={onModalOpenHandler}
          onAddButtonClick={setImagesHandler}
        />
      </SlidingPanel>

      <Modal
        selectedObjectData={selectedObject}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onInsertObjectHandler={setImagesHandler}
      />
    </>
  );
}
