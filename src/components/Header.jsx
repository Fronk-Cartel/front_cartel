import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="min-h-[10vh] flex items-center justify-center">
      <nav className="container mx-auto w-full bx-red-400 flex justify-center items-center gap-9 text-base">
        <ul className="flex gap-10 bg-red-0">
          <li>
            <a href="https://fronk-cartel.vercel.app/">HOME</a>
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
