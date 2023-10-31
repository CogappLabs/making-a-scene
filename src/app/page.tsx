import Link from 'next/link';

export default function Page() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Make a Scene
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl lg:text-base xl:text-xl dark:text-zinc-400">

            </p>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              href="/rooms"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      {/* <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-md">
              <Image
                alt="Card Image"
                className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center"
                height="200"
                src="/placeholder.svg"
                width="200"
              ></Image>
              <h3 className="text-xl font-bold">Example 1 by NH</h3>
              <p className="text-zinc-500 md:text-base lg:text-sm xl:text-base dark:text-zinc-400">
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-md">
              <Image
                alt="Card Image"
                className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center"
                height="200"
                src="/placeholder.svg"
                width="200"
              ></Image>
              <h3 className="text-xl font-bold">Example 2 by AB</h3>
              <p className="text-zinc-500 md:text-base lg:text-sm xl:text-base dark:text-zinc-400">
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-md">
              <Image
                alt="Card Image"
                className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center"
                height="200"
                src="/placeholder.svg"
                width="200"
              ></Image>
              <h3 className="text-xl font-bold">Example 3 by GR</h3>
              <p className="text-zinc-500 md:text-base lg:text-sm xl:text-base dark:text-zinc-400">
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
