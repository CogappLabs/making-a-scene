import Footer from "../components/Footer";
import Header from "../components/Header";

export default function RoomPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header showTitle />
      <div className="px-8 flex flex-col">
        {children}
      </div>
      <Footer />
    </>
  );
}
