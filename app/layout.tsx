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
import Script from "next/script";

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
      {/* Google Tag Manager */}
      <Script id="gtm-head" strategy="beforeInteractive">
        {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PB9ZM5C');
          `}
      </Script>
      <body className={` ${inter.className} antialiased scroll-smooth`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PB9ZM5C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <NavBar locations={locations} settings={settings as TSettings} />
        {children}
        <Footer settings={settings as TSettings} locations={locations} />
        <Toaster />
      </body>
    </html>
  );
}
