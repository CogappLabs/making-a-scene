'use client';

import algoliasearch from 'algoliasearch/lite';
import { Configure, InfiniteHits, RefinementList, SearchBox } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);

function Hit({ hit }) {
  let cutoutPath = `/cutouts/${hit.objectID}.png`;
  return (
    <div className="w-50">
      <div className="flex flex-col items-center max-w-50">
      <h3>{hit.title}</h3>
        {/* <img src={hit.primaryImage} alt="" /> */}
        <img src={cutoutPath} alt="" className="w-20" />
      </div>
    </div>
  );
}

export function Search() {
  return (
    <InstantSearchNext indexName="nga_objects" searchClient={searchClient}>
      <Configure filters="classification:'Index of American Design'"></Configure>
      <div className="p-6">
        <SearchBox />
        {/* <RefinementList attribute="Keyword" showMore /> */}
        <InfiniteHits hitComponent={Hit} />
      </div>
    </InstantSearchNext>
  );
}
