import type { Metadata } from "next";
import { Inter, Poetsen_One } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/layout/header/Navbar";
import Footer from "@/components/layout/footer/Footer";
import { fetchLocations } from "@/helper/fetchFromDirectus";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import { TSettings } from "@/interfaces";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
export const poetsenOne = Poetsen_One({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Carpet Depot",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locations = await fetchLocations();
  const settings = await directus.request(readSingleton("settings"));
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased scroll-smooth`}>
        <NavBar locations={locations} settings={settings as TSettings} />
        {children}
        <Footer settings={settings as TSettings} locations={locations} />
        <Toaster />
      </body>
    </html>
  );
}
