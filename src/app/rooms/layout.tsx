import Header from "../components/Header";

export default function RoomPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-8 bg-slate-200 h-screen flex flex-col">
      {children}
    </div>
  );
}
