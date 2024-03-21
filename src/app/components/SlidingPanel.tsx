import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function SlidingPanel({ isOpen, setIsOpen, children }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xl">
                  <div className="flex h-full flex-col overflow-y-scroll shadow-xl bg-white">
                    <div className="flex justify-between items-center p-8">
                      <Dialog.Title>
                        <span className="font-bold text-xl">Search for an object</span>
                      </Dialog.Title>
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <span className="sm:ml-3">
                          <button
                            className="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-black hover:text-white"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="text-sm">Hide</span>
                          </button>
                        </span>
                      </Transition.Child>
                    </div>
                    <div className="relative flex-1 px-8">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
