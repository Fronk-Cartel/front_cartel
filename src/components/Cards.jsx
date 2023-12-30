import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
// import img from "public/assets/image/Fronk Cartel #1.png";
import pic from "../../public/assets/images/300.png";

export default function Cards() {
  const cardRef = useRef(null);

  useEffect(() => {
    const reveal = gsap.fromTo(
      ".cards",
      { opacity: 0, translateY: 20 },
      {
        opacity: 1,
        translateY: 0,
        duration: 2,
        ease: "elastic.out(1, 0.4)",
        stagger: 0.1,
      }
    );
    return () => {
      reveal.kill();
    };
  }, []);
  return (
    <div ref={cardRef} className="cards overflow-hidden">
      <div>
        <p className="text-primary font-bold px-2 py-1">#123</p>
      </div>
      <div>
        <Image
          src={pic}
          width={500}
          height={500}
          alt="hello"
        //   priority
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <p className="text-primary font-bold px-2 py-2 text-sm">Hello boss</p>
      </div>
    </div>
  );
}
