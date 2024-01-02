import Image from "next/image";
import React from "react";
import Traits from "./Traits";

export default function Modal({ info, show }) {
  const renderTraits = () => {
    return info?.attributes.map((a) => {
      //   console.log(a.trait_type);
      return <Traits key={info.value} trait={a.trait_type} value={a.value} />;
    });
  };
  //   console.log(info.attributes);

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
            {/* <Image
                src={`/assets/images/234.png`}
                width={500}
                height={500}
                alt="hello"
                //   priority
                loading="lazy"
                className="w-full h-full object-contain"
                /> */}
          </div>
          <div className="text-center">
            <marquee className="whitespace-wrap">dna: {info.dna}</marquee>
            <p> edition: {info.edition} </p>
            <p>date: {info.date}</p>
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
            {/* <Traits trait="1 Background" value="Doge" />
            <Traits trait="2 Base" value="Genesis" />
            <Traits trait="3 Body" value="Jacket" />
            <Traits trait="3 Body" value="Jacket" />
            <Traits trait="3 Body" value="Jacket" />
            <Traits trait="3 Body" value="Jacket" /> */}
          </div>

          <div className="flex flex-col mb-2 justify-between items-start mt-5">
            <div className="text-xs">Compiler</div>
            <div>{info.compiler}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
