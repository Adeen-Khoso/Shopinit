import React from "react";
import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <MutatingDots
        visible={true}
        height="120"
        width="120"
        color="#2F3C7E"
        secondaryColor="#2F3C7E"
        radius="11.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
