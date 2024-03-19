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
    } else if (router.pathname === "/demons") {
      return "black-bg";
      // console.log("demons");
    } else {
      return "bg-primary";
    }
  };

  const logo = () => {
    if (router.pathname === "/devs") {
      return "/assets/images/25.png";
    } else if (router.pathname === "/demons") {
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
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.2,
      }
    );
    return () => {
      reveal.kill();
    };
  }, [showMenu]);

  return (
    <header
      className={`relative min-h-[5vh] bg-red400 flex items-start pt-2 justify-end px-4 ${bg()}`}
    >
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
          {/* {router.pathname === "/devs" ? (
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
          )} */}

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
            <Link href="/demons">demons</Link>
          </li>
        </ul>
        <div className="mr-2 mt-2 cursor-pointer">
          <MdOutlineCancel onClick={handleMenu} size={30} />
        </div>
      </nav>
      {!showMenu && (
        <div className="cursor-pointer">
          <IoIosMenu onClick={handleMenu} size={40} />
        </div>
      )}
    </header>
  );
}
