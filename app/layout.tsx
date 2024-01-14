import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer/Footer";
import ModalProvider from "@/components/modal/ModalProvider";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "TeamHarbor",
  description: "your project manegement tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(font.className)}>
        <Toaster />
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
