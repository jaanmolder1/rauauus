import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar lang="en" />
      <main>{children}</main>
      <Footer lang="en" />
      <FloatingChat lang="en" />
    </>
  );
}
