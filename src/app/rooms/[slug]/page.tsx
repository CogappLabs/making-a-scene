'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CameraIcon, PencilIcon } from '@heroicons/react/20/solid';
import Header from '@/app/components/Header';
import Modal from '@/app/components/Modal';
import { Search } from '@/app/components/Search';
import SlidingPanel from '@/app/components/SlidingPanel';
import useImage from 'use-image';

const Canvas = dynamic(() => import('@/app/components/WrappedCanvas'), {
  ssr: false,
});

export default function Page({ params }) {
  const slug = params.slug;
  const bgImageUrl = `/rooms/room-${slug}.png`;

  const stageRef = useRef(null);

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
  const [images, setImages] = useState<{
    src: string;
    id: string;
    x: number;
    y: number;
  }[]>([]);

  const backgroundImage = {
    src: bgImageUrl,
    id: uuidv4(),
    x: 0,
    y: 0,
  };

  const setImagesHandler = (src: string, position = { x: 100, y: 100 }) => {
    const image = {
      src,
      id: uuidv4(),
      ...position,
    };
    setImages(images.concat([image]));
  };

  const onModalOpenHandler = (data) => {
    setSelectedObject(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <Header>
        <div className="flex gap-4">
          <span className="">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-generosity-green px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-200"
              onClick={() => setIsSidebarOpen(true)}
            >
              <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Edit
            </button>
          </span>

          <span className="">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-imagination-magenta px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:text-black"
              onClick={() => stageRef?.current?.downloadImage()}
            >
              <CameraIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </span>

          {/* <span className="">
          <DarkModeButton />
        </span> */}
        </div>
      </Header>

      <main className="pb-8 grow">
        <Canvas
          stageRef={stageRef}
          dragUrl={dragUrl}
          setDragUrl={setDragUrl}
          images={images}
          setImages={setImages}
          onDropHandler={setImagesHandler}
          backgroundLayerImage={backgroundImage}
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
