import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

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
    <div ref={cardRef} className="cards">
      hellos
    </div>
  );
}
