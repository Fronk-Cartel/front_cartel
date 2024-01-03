import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Modal from "./Modal";
// import pic from "../../public/assets/images/300.png";

export default function Cards({ info }) {
  const cardRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const show = () => {
    setShowModal(!showModal);
  };

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
    <>
      <div
        onClick={show}
        ref={cardRef}
        className="cards overflow-hidden opacity-0 cursor-pointer"
      >
        <div>
          <p className="text-primary  font-bold px-4 py-1 text-sm text-center">
            {info.name}
          </p>
        </div>
        <div>
          <Image
            src={`/assets/images${info.image}`}
            width={500}
            height={500}
            alt="hello"
            //   priority
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <p className="text-primary font-bold px-2 py-2 text-sm"></p>
        </div>
      </div>
      {showModal && (
        <>
          <div
            onClick={show}
            className="cursor-pointer text-3xl fixed z-[100] right-5 top-2"
          >
            X
          </div>
          <Modal info={info} />
        </>
      )}
    </>
  );
}
