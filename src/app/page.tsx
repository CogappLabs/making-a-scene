import clsx from 'clsx';
import Image from 'next/image';
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
            <Link
              className={clsx(
                "inline-flex h-9 items-center justify-center",
                "rounded-md bg-zinc-900",
                "px-4 py-2",
                "text-sm font-medium text-zinc-50",
                "shadow transition-colors",
                "hover:bg-zinc-900/90",
               "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
               "disabled:pointer-events-none disabled:opacity-50",
               "dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              )}
              href="/rooms"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
