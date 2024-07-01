import React from "react";
import { TailSpin } from "react-loader-spinner";

function Loader() {
  return (
    <div className="absolute z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <TailSpin color="#fff" height={100} width={100} />
    </div>
  );
}

export default Loader;
