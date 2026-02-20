import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    </>
  );
}
