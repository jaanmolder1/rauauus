import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    </>
  );
}
