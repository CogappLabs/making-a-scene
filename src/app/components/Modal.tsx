/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

export default function Modal({ isOpen, setIsOpen, selectedObjectData, onInsertObjectHandler }) {
  const { title, attribution, objectID, primaryImage, accessionnum, medium, displaydate } = selectedObjectData ?? {};
  const imageSrc = `/scene-assets/${objectID}.png`;

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white rounded-2xl p-6 text-left align-middle drop-shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-xl font-semibold">
                    {title}
                  </Dialog.Title>

                  <div className="py-4 mb-4 border-t border-gray-100 text-sm grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <dl className="space-y-4">
                        <div>
                          <dt className="font-semibold">Attribution:</dt>
                          <dd className="">{attribution}</dd>
                        </div>

                        <div>
                          <dt className="font-semibold">Date and Medium:</dt>
                          <dd className="">{displaydate}, {medium}.</dd>
                        </div>

                        <div>
                          <dt className="font-semibold">Location:</dt>
                          <dd className="">You can find this artwork in the Index of American Design at the National Gallery of Art. It&apos;s accession number is {accessionnum}.</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <figure className="flex flex-col items-center space-y-4">
                        <img src={primaryImage} alt={title} className="w-30 h-auto" />
                        <figcaption >
                          <a
                            href={`https://www.nga.gov/collection/art-object-page.${objectID}.html`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline hover:underline"
                          >
                            Click here to see the original record on the NGA website
                          </a>
                        </figcaption>
                      </figure>
                    </div>
                  </div>

                  <div className="flex flex-row flex-wrap justify-between gap-4">
                    <span className="">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-black shadow-sm ring-inset ring-gray-300 hover:bg-black hover:text-green"
                        onClick={() => {
                          onInsertObjectHandler(imageSrc);
                          closeModal();
                        }}
                      >
                        <PlusCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        Add to your scene
                      </button>
                    </span>

                    <span className="">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-black hover:text-white"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </span>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
