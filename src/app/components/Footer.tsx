/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <footer className="bg-black flex flex-row items-center justify-end p-4 text-white mt-8">
      <p>
        Made with{" "}
        <img
          className="inline"
          width="20"
          height="20"
          alt="Cat typing really fast emoji"
          src="https://emojis.slackmojis.com/emojis/images/1643514285/2559/cattyping.gif?1643514285"
        />{" "}
        by neilh @ <a className="decoration text-white underline underline-offset-2" href="https://www.cogapp.com" target="_blank">Cogapp</a>
      </p>
    </footer>
  );
}
