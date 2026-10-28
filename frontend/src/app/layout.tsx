import type { Metadata } from "next";
import { Josefin_Sans, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "sonner";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Wanderlast | Travel Booking",
  description:
    "Discover breathtaking destinations and create unforgettable memories with Wanderlast.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.className} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Toaster position="top-center" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
