import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Header() {
  const navRef = useRef(null);

  useEffect(() => {
    const reveal = gsap.fromTo(
      navRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.inOut" }
    );
    return () => {
      reveal.kill();
    };
  }, []);

  return (
    <header className="min-h-[10vh] flex items-center justify-center">
      <nav className="container mx-auto w-full bx-red-400 flex justify-center items-center gap-9 text-base">
        <ul ref={navRef} className="flex gap-10 bg-red-0">
          <li>
            <a href="https://doggy.market/nfts/fronkcartel" target="_blank">Market</a>
          </li>
          <li>
            <a href="https://twitter.com/FronkCartel">X</a>
          </li>
          <li>
            <a href="https://t.me/fronkcartel">TELEGRAM</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
