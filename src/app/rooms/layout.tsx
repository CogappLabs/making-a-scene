export default function RoomPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-8 bg-slate-200 flex flex-col h-screen">
      {children}
    </div>
  );
}
