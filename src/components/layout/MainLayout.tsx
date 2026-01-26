import Footers from "./Footers";
import Nav from "./Nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 p-4">{children}</main>
      <Footers />
    </div>
  );
}
