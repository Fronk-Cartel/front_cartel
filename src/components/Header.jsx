import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";

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

  const router = useRouter();
  // console.log(router.pathname);

  const bg = () => {
    if (router.pathname === "/devs") {
      return "bg-gray-500";
    } else if (router.pathname === "/demons") {
      return "black-bg";
      // console.log("demons");
    } else {
      return "bg-primary";
    }
  };
  // const link = () => {
  //   if (router.pathname === "/devs") {
  //     return (
  //       <li>
  //         <a href="https://doggy.market/nfts/devs" target="_blank">
  //           Market
  //         </a>
  //       </li>
  //     );
  //   } else if (router.pathname === "/demons") {
  //     return "bg-red-800";
  //     // console.log("demons");
  //   } else {
  //     return "bg-primary";
  //   }
  // };


  return (
    <header
      className={`min-h-[10vh] flex items-center justify-center ${bg() }`}
    >
      <nav className="container mx-auto w-full bx-red-400 flex justify-center items-center gap-9 text-base">
        <ul
          ref={navRef}
          className="flex gap-2 flex-wrap items-center justify-center  bg-red-0"
        >
          {router.pathname === "/devs" ? (
            <li>
              <a href="https://doggy.market/nfts/devs" target="_blank">
                Market
              </a>
            </li>
          ) : (
            <li>
              <a href="https://doggy.market/nfts/fronkcartel" target="_blank">
                Market
              </a>
            </li>
          )}
          <li>
            <a href="https://twitter.com/FronkCartel" target="_blank">
              X
            </a>
          </li>
          <li>
            <a href="https://t.me/fronkcartel" target="_blank">
              TELEGRAM
            </a>
          </li>

          {router.pathname === "/devs" ? (
            <li>
              <Link href="/">Fronkcartel</Link>
            </li>
          ) : (
            <li>
              <Link href="/devs">.devs</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
