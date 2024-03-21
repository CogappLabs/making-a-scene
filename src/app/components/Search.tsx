/* eslint-disable @next/next/no-img-element */
'use client';

import { PlusCircleIcon } from '@heroicons/react/20/solid';
import algoliasearch from 'algoliasearch/lite';
import { Configure, InfiniteHits, useSearchBox } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? ''
);

function Hit({ hit, onImageDragStart, onInfoButtonClick, onAddButtonClick }) {
  const { objectID, title } = hit;
  let cutoutPath = `/scene-assets/${objectID}.png`;

  return (
    <div className="flex gap-x-4 my-4 p-4 w-full rounded-sm border-blue border shadow">
      <div className="w-1/4">
        <img
          id={objectID}
          src={cutoutPath}
          alt={`Image of ${title}`}
          className="cursor-grab group-hover:opacity-75"
          draggable="true"
          onDragStart={() => onImageDragStart(cutoutPath, objectID)}
        />
      </div>
      <div className="flex flex-col flex-grow justify-between leading-normal">
        <div className="mb-8">
          <div className="font-bold text-xl mb-2">{title}</div>
        </div>

        <div className="flex items-center gap-x-1 self-end">
          <span className="">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-black hover:text-white"
              onClick={() => onInfoButtonClick(hit)}
            >
              <span>More Info</span>
            </button>
          </span>

          <span className="group">
            <button
              onClick={() => onAddButtonClick(cutoutPath)}
              className="inline-flex items-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-black shadow-sm ring-inset ring-gray-300 hover:bg-black hover:text-green"
            >
              <PlusCircleIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-black group-hover:text-green"
                aria-hidden="true"
              />
              <span>Add</span>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

function CustomSearchBox() {
  const { query, refine } = useSearchBox();
  return (
    <div className="p-4 bg-blue rounded-lg shadow-md mb-4">
      <label htmlFor="search" className="block text-lg font-bold mb-2 sr-only">
        Search for an object
      </label>
      <input
        type="text"
        id="search"
        placeholder="Type here..."
        value={query}
        onChange={(e) => refine(e.target.value)}
        className="w-full p-4 rounded-lg text-lg border-4 border-blue focus:border-blue focus:outline-none shadow-inner"
      />
    </div>
  );
}

export function Search({ onImageDragStart, onInfoButtonClick, onAddButtonClick }) {
  return (
    <InstantSearchNext indexName="nga_objects" searchClient={searchClient}>
      <Configure filters="classification:'Index of American Design'"></Configure>
      <CustomSearchBox />
      <InfiniteHits
        showPrevious={false}
        hitComponent={(props) => (
          <Hit
            {...props}
            onImageDragStart={onImageDragStart}
            onInfoButtonClick={onInfoButtonClick}
            onAddButtonClick={onAddButtonClick}
          />
        )}
      />
    </InstantSearchNext>
  );
}
