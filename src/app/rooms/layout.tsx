import Header from "../components/Header";

export default function RoomPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 flex flex-col">
      {children}
    </div>
  );
}
