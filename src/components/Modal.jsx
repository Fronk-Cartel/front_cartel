import Image from "next/image";
import React, { useEffect, useState } from "react";
import Traits from "./Traits";
import { MdOutlineContentCopy } from "react-icons/md";

export default function Modal({ info }) {
  const [data, setData] = useState(null);
  const [ins, setIns] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(ins);
    setCopied(true);

    // Reset the "Copied!" message after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const renderTraits = () => {
    return info?.attributes.map((a, i) => {
      // Use logical AND (&&) instead of OR (||) in the condition
      if (
        a.trait_type.toLowerCase() !== "1 background" &&
        a.trait_type.toLowerCase() !== "2 base"
      ) {
        return <Traits key={i} trait={a.trait_type.slice(1)} value={a.value} />;
      }
      return null; // Return null if the condition is not met
    });
  };

  useEffect(() => {
    const fetchInscription = async () => {
      try {
        const response = await fetch("/fronkcartel.json");
        const jsonData = await response.json();
        setData(jsonData);
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
  }, [data, info.name]);
  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#00000090] backdrop-blur-sm min-h-screen flex p-4 items-center justify-center ">
      <div className="px-4 py-4 bg-green-900 w-full md:max-w-md  max-h-[98vh] overflow-auto hide-scroll rounded-lg ">
        <div
          className="relative
         flex flex-col items-center max-w-full"
        >
          <h3 className="text-lg">{info?.name}</h3>
          <div className="w-1/2  my-2 rounded-lg overflow-hidden">
            <Image
              src={`/assets/images${info?.image}`}
              width={500}
              height={500}
              alt="hello"
              //   priority
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center">
            <button onClick={handleCopyClick} className=" ">
              {copied ? (
                "Copied Inscriptional ID!"
              ) : (
                <div className="flex items-center space-x-2">
                  {" "}
                  <MdOutlineContentCopy size={20} /> <span>copy Id</span>
                </div>
              )}
            </button>
            <marquee className="whitespace-wrap">Inscription ID: {ins}</marquee>
            <marquee className="whitespace-wrap mt-1">dna: {info.dna}</marquee>
          </div>
        </div>

        <div className="bg-primary mt-5 rounded-lg pt-1 pb-1 px-3">
          <h3 className="text-lg text-center mt-2 ">Attributes</h3>
          <div>
            <div className="flex justify-between text-lg mb-1">
              <div className="flex-1 text-cente ">Trait Type</div>
              <div className="text-end flex-1">Value</div>
            </div>
            {renderTraits()}
          </div>
        </div>
      </div>
    </div>
  );
}
