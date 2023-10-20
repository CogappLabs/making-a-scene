'use client';

import algoliasearch from 'algoliasearch/lite';
import { Configure, InfiniteHits, RefinementList, SearchBox } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

function Hit({ hit, handleDragStart }) {
  let cutoutPath = `/cutouts/${hit.objectID}.png`;
  return (
    <div className="w-50">
      <div className="flex flex-col items-center max-w-50">
        <h3>{hit.title}</h3>
        <p>{hit.objectID}</p>
        {/* <img src={hit.primaryImage} alt="" /> */}
        <img
          src={cutoutPath}
          alt=""
          className="w-20 cursor-grab"
          draggable="true"
          onDragStart={() => {
            handleDragStart(cutoutPath);
          }}
        />
      </div>
    </div>
  );
}

export function Search({ handleDragStart }) {
  return (
    <InstantSearchNext indexName="nga_objects" searchClient={searchClient}>
      <Configure filters="classification:'Index of American Design'"></Configure>
      <div className="p-6">
        <SearchBox />
        {/* <RefinementList attribute="Keyword" showMore /> */}
        <InfiniteHits hitComponent={(props) => <Hit {...props} handleDragStart={handleDragStart} />} />
      </div>
    </InstantSearchNext>
  );
}
