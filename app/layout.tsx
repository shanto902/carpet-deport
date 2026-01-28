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
}: {
  children: React.ReactNode;
}) {
  const locations = await fetchLocations();
  const settings = await directus.request(readSingleton("settings"));

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager Script */}
        <Script
          id="gtm-head"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PB9ZM5C');
            `,
          }}
        />

        {/* Meta Pixel Script */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1074459663701854');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* HubSpot Embed Code */}
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="//js-na2.hs-scripts.com/244998019.js"
        />
      </head>
      <body className={`${inter.className} antialiased scroll-smooth`}>
        {/* GTM NoScript Fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PB9ZM5C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Facebook Pixel NoScript Fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1074459663701854&ev=PageView&noscript=1"
          />
        </noscript>

        <NavBar locations={locations} settings={settings as TSettings} />
        {children}
        <Footer settings={settings as TSettings} locations={locations} />
        <Toaster />
      </body>
    </html>
  );
}
