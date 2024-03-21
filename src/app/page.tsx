import { PhotoIcon, ExclamationTriangleIcon, CameraIcon, PencilIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="mx-auto grid max-w-2xl gap-x-8 gap-y-16">

              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                  Make a Scene
                </h1>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <PhotoIcon className="mt-1 h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                    <span>
                      <strong className="block font-semibold text-gray-900">Create Your Scene</strong> Choose a room, then search for objects from the Index of American Design and add them to your scene.
                      <p>
                        Each room is a blank canvas for you to work with.
                      </p>
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <PencilIcon className="mt-1 h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                    <span>
                      <strong className="block font-semibold text-gray-900">Customize</strong> Resize and rearrange - there are no rules!
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <CameraIcon className="mt-1 h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                    <span>
                      <strong className="block font-semibold text-gray-900">Share</strong> Once you are happy with your scene, hit save to download a copy of your creation.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ExclamationTriangleIcon className="mt-1 h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                    <span>
                      <strong className="block font-semibold text-gray-900">Disclaimer...</strong>Please note that &quot;Make a Scene&quot; is a prototype thrown together in a few hours as part of a Cogapp Hackday, so it probably contains a few rough edges and bugs!
                    </span>
                  </li>
                </ul>
              </div>
              {/* <div className="flex justify-center mt-4"> */}
                <Link
                  className="text-white text-center rounded-md bg-green p-4 font-bold shadow-md hover:bg-green hover:text-black hover:shadow-lg"
                  href="/rooms"
                >
                  Get Started
                </Link>
              {/* </div> */}
              <p className="mt-8">
                <a className="underline underline-offset-2 decoration-black" href="https://medium.com/p/e5560728dc02" target="_blank">Read the accompanying blog post</a>, or <a className="underline underline-offset-2 decoration-black" href="https://www.cogapp.com" target="_blank">find out more about Cogapp</a>.
              </p>

        </div>
      </section>
    </>
  );
}
