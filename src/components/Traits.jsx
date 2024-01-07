import React from "react";

export default function Traits({ trait, value, total }) {
  const calcPercentage = (value * 100) / total;
  // console.log(calcPercentage);

  return (
    <div className="flex justify-between">
      <div className="flex- text-start "> {trait}</div>
      {/* <div className="flex space-x-2"> */}
      <div className="flex- text-start "> {calcPercentage}%</div>
      {/* <div className="text-end flex-1"> {occurence}</div> */}
      {/* </div> */}
    </div>
  );
}
