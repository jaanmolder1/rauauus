import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

export default function EtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar lang="et" />
      <main>{children}</main>
      <Footer lang="et" />
      <FloatingChat lang="et" />
    </>
  );
}
