"use client";

import Header from "../components/Header";
import { useState, useEffect } from "react";
import Preloader from "../components/Preloader";

export default function PastLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Header />
          {children}
        </>
      )}
    </>
  );
}
