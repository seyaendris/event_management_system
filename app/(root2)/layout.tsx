import Footer from "@/components/shared/Footer";
import VendorHeader from "@/components/shared/VendorHeader";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex flex-col h-screen">
          <VendorHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      
    );
  }