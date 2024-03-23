/* eslint-disable @next/next/no-img-element */
import {
  PhotoIcon,
  ExclamationTriangleIcon,
  CameraIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Page() {
  return (
    <>
      <Header showTitle={false}/>
      <section className="w-full p-8 md:p-12 lg:p-16">
        <div className="grid text-base leading-7 text-gray-700 gap-8 xl:max-w-4xl xl:mx-auto">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Make a Scene
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            <ul role="list" className="shrink space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <span>
                  <strong className="block font-semibold text-gray-900">
                    Build your own dioramas using objects from the <a className="underline" href="https://www.nga.gov/features/exhibitions/outliers-and-american-vanguard-artist-biographies/index-of-american-design.html">Index of American Design</a>.
                  </strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <PhotoIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="block font-semibold text-gray-900">
                    Create Your Scene
                  </strong>{" "}
                  Choose a room for your background scene, then search for objects
                  from the Index of American Design and place them around the room.
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
                <CameraIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="block font-semibold text-gray-900">
                    Credits
                  </strong>{" "}
                    <ul>
                      <li>Cutouts were generated from the Index of American Design. National Gallery of Art, Washington.</li>
                      <li>Background scenes were created by scoutb (and Midjourney).</li>
                    </ul>
                </span>
              </li>
              <Link
                className="block bg-green hover:bg-green rounded-md p-4 text-center font-bold text-white shadow-md hover:text-black hover:shadow-lg"
                href="/rooms"
              >
                Play!
              </Link>
            </ul>
            <div>
              <div className="py-4">
                <img className="rounded-lg" src="/images/room-1.jpeg" alt="" />
              </div>
              <div className="py-4">
                <img className="rounded-lg" src="/images/room-2.jpeg" alt="" />
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-x-3 text-md text-black bg-pink-200 p-4">
            <span>
              &quot;Make a Scene&quot; is a prototype game put together
              in a few hours as part of <a href="https://www.cogapp.com">Cogapp</a> Hack Day, so
              it contains rough edges and bugs!
            </span>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
