import React from 'react'

export default function Traits({trait, value}) {
  return (
    <div className="flex justify-between">
      <div className="flex- text-start "> {trait}</div>
      <div className="text-end flex-1"> {value}</div>
    </div>
  );
}
