"use client"; 

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Show the preloader for 100ms
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer); // Cleanup the timeout when the component unmounts
  }, []);

  const showFooter = pathname !== '/past';

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/arhamlogosq.png" />
      </head>
      <body>
        {loading ? ( // Show Preloader while loading is true
          <Preloader />
        ) : (
          <>
            <Header />
            {children}
            {showFooter &&<Footer />}
          </>
        )}
      </body>
    </html>
  );
}
