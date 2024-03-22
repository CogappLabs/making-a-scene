"use client";

import Link from 'next/link';
import Image from 'next/image';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';

const backgroundImages = [
  'room-1',
  'room-2',
  'room-3',
  'room-4',
];

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between py-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-black sm:truncate sm:text-3xl sm:tracking-tight">
            Choose a room to decorate
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-6">
        {backgroundImages.map((bgImage, i) => (
          <div className="group" key={i}>
            <Link
              href={`/rooms/${i + 1}`}
              className="flex flex-col items-center text-white rounded-md bg-blue pt-4 px-4 text-sm font-semibold shadow-sm hover:bg-green hover:text-black"
            >
              <Image
                src={`/images/${bgImage}.jpeg`}
                alt="Room Image"
                className="group-hover:opacity-75"
                width={800}
                height={800}
              />
              <span className="inline-flex items-center p-4">
                <PaperAirplaneIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{`Decorate room ${i + 1}`}</span>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
