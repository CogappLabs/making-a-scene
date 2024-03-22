/* eslint-disable @next/next/no-img-element */
import {
  PhotoIcon,
  ExclamationTriangleIcon,
  CameraIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <header className="bg-blue flex flex-row items-center justify-between p-4 text-white">
        <a
          className="decoration text-white underline underline-offset-2"
          href="https://medium.com/p/e5560728dc02"
          target="_blank"
        >
          read the blog post
        </a>{" "}
        <a
          className="decoration text-white underline underline-offset-2"
          href="https://www.cogapp.com"
          target="_blank"
        >
          {" "}
          find out more about Cogapp
        </a>
      </header>
      <section className="w-full p-8 md:p-12 lg:p-20">
        <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-16">
          <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg flex flex-col gap-8">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Make a Scene
            </h1>
            <div>
              <ul role="list" className="space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <PhotoIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="block font-semibold text-gray-900">
                      Create Your Scene
                    </strong>{" "}
                    Choose a room, then search for objects from the Index of
                    American Design and add them to your scene.
                    <p>Each room is a blank canvas for you to work with.</p>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <PencilIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="block font-semibold text-gray-900">
                      Customize
                    </strong>{" "}
                    Resize and rearrange - there are no rules!
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CameraIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="block font-semibold text-gray-900">
                      Share
                    </strong>{" "}
                    Once you are happy with your scene, hit save to download a
                    copy of your creation.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ExclamationTriangleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="block font-semibold text-gray-900">
                      Disclaimer...
                    </strong>
                    Please note that &quot;Make a Scene&quot; is a prototype
                    thrown together in a few hours as part of a Cogapp Hackday, so
                    it contains rough edges and bugs!
                  </span>
                </li>
              </ul>
            </div>
            <Link
              className="block bg-green hover:bg-green rounded-md p-4 text-center font-bold text-white shadow-md hover:text-black hover:shadow-lg"
              href="/rooms"
            >
              Play!
            </Link>
          </div>
          <div>
            <div className="py-4">
              <img className="rounded-lg" src="/images/room-1.jpeg" alt="" />
            </div>
            <div className="py-4">
              <img className="rounded-lg" src="/images/room-2.jpeg" alt="" />
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-blue flex flex-row items-center justify-end p-4 text-white">
        <p>
          Made with{" "}
          <img
            className="inline"
            width="20"
            height="20"
            alt="Cat typing really fast emoji"
            src="https://emojis.slackmojis.com/emojis/images/1643514285/2559/cattyping.gif?1643514285"
          />{" "}
          by neilh
        </p>
      </footer>
    </>
  );
}
