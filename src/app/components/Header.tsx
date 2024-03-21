export default function Header({ children }) {
  return (
    <div className="flex items-center justify-between py-8">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-black sm:truncate sm:text-3xl sm:tracking-tight">
          Make a Scene
        </h2>
      </div>
      {children}
    </div>
  );
}
