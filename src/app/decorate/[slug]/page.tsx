'use client';
import dynamic from 'next/dynamic';
// import Canvas from '../components/canvas';
import { Search } from '../../components/search';
import { useRef, useState } from 'react';

const Canvas = dynamic(() => import('../../components/canvas'), {
  ssr: false,
});

export default function Page({ params }) {
  const slug = params.slug;
  const bgImageUrl = `/rooms/room-${slug}.png`;

  // Keep state at parent level.
  const [dragUrl, setDragUrl] = useState(null);

  const handleDragStart = (url) => {
    console.log('drag start');
    console.log(url);
    setDragUrl(url);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">Decorate</h1>
        </div>
      </header>
      {/* <input id="my-drawer" type="checkbox" className="drawer-toggle" /> */}

      <aside className="fixed top-0 left-0 h-full bg-white w-64 border-r p-4 shadow-lg overflow-y-auto">
        <Search handleDragStart={handleDragStart} />
      </aside>

      <main className="flex min-h-full">
        {/* Main Canvas Content */}
        <section
          className="ml-64 w-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        >
          <Canvas dragUrl={dragUrl} setDragUrl={setDragUrl} />
        </section>
      </main>
    </div>
  );
}
