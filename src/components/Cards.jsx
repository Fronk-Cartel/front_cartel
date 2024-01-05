import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Modal from "./Modal";
import { MdOutlineContentCopy } from "react-icons/md";
// import pic from "../../public/assets/images/300.png";

export default function Cards({ info, rank }) {
  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null);
  const cardRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [ranked, setRanked] = useState(null);
  const [copied, setCopied] = useState(false);
  const [ins, setIns] = useState("");

  const show = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    // Find the rank based on the info name
    const getRank = rank.find((r) => r.name === info.name);

    if (getRank !== undefined) {
      const indexOfRank = rank.indexOf(getRank);
      setRanked(indexOfRank);
    } else {
      console.log("Rank not found");
    }
  }, [rank, info]);

  useEffect(() => {
    const fetchInscription = async () => {
      try {
        const response = await fetch("/fronkcartel.json");
        const jsonData = await response.json();
        setData(jsonData);
        const res = await fetch("/_metadata.json");
        const json = await res.json();
        setAllData(json);
        // console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchInscription();
  }, []);

  useEffect(() => {
    const renderInscription = () => {
      return data?.map((d) => {
        if (d.name === info.name) {
          setIns(d.inscriptionId);
        }
      });
    };

    renderInscription();
  }, [data, info]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(ins);
    setCopied(true);

    // Reset the "Copied!" message after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
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
        ref={cardRef}
        className="cards overflow-hidden opacity-0 cursor-pointer"
      >
        <div className="flex items-center justify-center">
          <p className="text-primary w-2/3  font-bold  py-1 text-sm text-center">
            {info.name}
          </p>
        </div>
        <div onClick={show}>
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
          <div className="flex justify-end items-center px-3">
            <p className="text-primary font-bold px-2 py-2 text-sm text-end">
              #{ranked}
            </p>
            <div onClick={handleCopyClick} className="text-primary ">
              {copied ? (
                <div className="text-primary">Copied</div>
              ) : (
                <div className="flex items-center text-primary ">
                  {" "}
                  <MdOutlineContentCopy fill="#1e6f50" size={20} />
                  {/* <span>copy Id</span> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <>
          <div
            onClick={show}
            className="cursor-pointer text-3xl fixed z-[100] right-5 top-5"
          >
            X
          </div>
          <Modal info={info} />
        </>
      )}
    </>
  );
}
