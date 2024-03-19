/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

export default function Header() {
  const navRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const {pathname} = useRouter()

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

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
    } else if (router.pathname === "/d9monz") {
      return "black-bg";
      // console.log("demons");
    } else {
      return "bg-primary";
    }
  };

  const logo = () => {
    if (router.pathname === "/devs") {
      return "/assets/images/25.png";
    } else if (router.pathname === "/d9monz") {
      return "/assets/logo/demon_logo.jpeg";
    } else {
      return "/assets/9901.png";
    }
  };

  useEffect(() => {
    const reveal = gsap.fromTo(
      "li",
      { x: -100 },
      {
        x: 0,
        duration: 0.3,
        ease: "power2.inOut",
        stagger: 0.1,
      }
    );
    return () => {
      reveal.kill();
    };
  }, [showMenu]);

  return (
    <header
      className={`relative min-h-[5vh] bg-red400 flex items-start pt-2 justify-start px-4 ${bg()}`}
    >
      {!showMenu && (
        <div className="cursor-pointer">
          <IoIosMenu onClick={handleMenu} size={40} />
        </div>
      )}
      <nav
        onClick={handleMenu}
        className={`${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }  absolute bg-[#00000090]  backdrop-blur-sm top-0 bottom-0 left-0 right-0 h-screen z-50  w-full bx-red-400 flex justify-between gap-9 text-base duration-500`}
      >
        <ul
          ref={navRef}
          className={`${bg()} flex gap-2 text-lg flex-col p-4 md:px-10 w-2/3 max-w-md bg-red-0`}
        >
          <div className="text-white mb-5 h-20 w-20 mx-auto flex justify-center">
            <img
              // src={`https://ik.imagekit.io/ebmc7qv63/demons/Demon%20_986.png?updatedAt=1710800504904`}
              src={logo()}
              width={500}
              height={500}
              alt="logo"
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>

          {pathname === "/d9monz" ? (
            <>
              <li>
                <a href="https://doggy.market/nfts/d9monz" target="_blank">
                  Market
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/nsb_CC?t=daoBdLKJSJm9P3oKHZTO4w&s=09"
                  target="_blank"
                >
                  X
                </a>
              </li>
              <li>
                <a href="https://t.me/nsbCC" target="_blank">
                  TELEGRAM
                </a>
              </li>
              <li>
                <Link href="/">Fronkcartel</Link>
              </li>
              <li>
                <Link href="/devs">.devs</Link>
              </li>
              <li>
                <Link href="/d9monz">d9monz</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="https://doggy.market/nfts/fronkcartel" target="_blank">
                  Market
                </a>
              </li>
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
              <li>
                <Link href="/">Fronkcartel</Link>
              </li>
              <li>
                <Link href="/devs">.devs</Link>
              </li>
              <li>
                <Link href="/d9monz">d9monz</Link>
              </li>
            </>
          )}
        </ul>
        <div className="mr-2 mt-2 cursor-pointer">
          <MdOutlineCancel onClick={handleMenu} size={30} />
        </div>
      </nav>
    </header>
  );
}
