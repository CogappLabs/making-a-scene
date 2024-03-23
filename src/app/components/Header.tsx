import Link from "next/link";

export default function Header({ showTitle }) {
  return (
    <header className="bg-blue flex flex-row items-center justify-between p-4">
      {showTitle && (
        <Link href="/">
          <h1 className="text-lg text-white font-bold md:text-xl lg:text-2xl">
            Make a Scene
          </h1>
        </Link>
      )}
      <a
        className="decoration underline underline-offset-2 text-white"
        href="https://medium.com/p/e5560728dc02"
        target="_blank"
        rel="noopener noreferrer"
      >
        read the blog post
      </a>
    </header>
  );
}
