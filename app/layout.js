import React from "react";
import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";

import { SITENAME, SITE_DESCRIPTION, TITLE_TAGLINE } from "./config";

// import { Inter } from "next/font/google";
// google fonts class className={inter.className}
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: SITENAME + " : " + TITLE_TAGLINE,
  description: SITE_DESCRIPTION,
  manifest: "manifest.json",

  // openGraph: {
  //   title: 'Next.js',
  //   description: 'The React Framework for the Web',
  //   url: 'https://nextjs.org',
  //   siteName: 'Next.js',
  //   images: [
  //     {
  //       url: 'https://nextjs.org/og.png',
  //       width: 800,
  //       height: 600,
  //     },
  //     {
  //       url: 'https://nextjs.org/og-alt.png',
  //       width: 1800,
  //       height: 1600,
  //       alt: 'My custom alt',
  //     },
  //   ],
  //   locale: 'en-US',
  //   type: 'website',
  // },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // icons: {
  //   icon: '/icon.png',
  //   shortcut: '/shortcut-icon.png',
  //   apple: '/apple-icon.png',
  //   other: {
  //     rel: 'apple-touch-icon-precomposed',
  //     url: '/apple-touch-icon-precomposed.png',
  //   },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Next.js',
  //   description: 'The React Framework for the Web',
  //   siteId: '1467726470533754880',
  //   creator: '@nextjs',
  //   creatorId: '1467726470533754880',
  //   images: ['https://nextjs.org/og.png'],
  // },
  // verification: {
  //   google: 'google',
  //   yandex: 'yandex',
  //   yahoo: 'yahoo',
  //   other: {
  //     me: ['my-email', 'my-link'],
  //   },
  // },
  // alternates: {
  //   canonical: '/',
  // },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="bg-light">
          <Header />
          {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
};
export default RootLayout;
