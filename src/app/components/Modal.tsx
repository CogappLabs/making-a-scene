import { Dialog, Transition } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

export default function Modal({ isOpen, setIsOpen, selectedObjectData, onInsertObjectHandler }) {
  const { title, classification, attribution, objectID } = selectedObjectData ?? {};
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
                  <Dialog.Title as="h3" className="text-base font-semibold leading-7 text-gray-900">
                    {title}
                  </Dialog.Title>

                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Artist</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {attribution}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Part of</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {classification}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex align-center justify-between">
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
