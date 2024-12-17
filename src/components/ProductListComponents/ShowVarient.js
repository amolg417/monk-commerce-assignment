import React from "react";
import downArrow from "../../assest/downArrow.svg";

const ShowVarient = ({ handleVarientButton, showVarients }) => {
  return (
    <div
      className="w-[20vw] flex gap-x-[0.2vw] items-center justify-end cursor-pointer"
      onClick={handleVarientButton}
    >
      <span className="fs-12 text-[#006EFF]">
        {showVarients ? "Hide variants" : "Show variants"}
      </span>
      <img
        src={downArrow}
        alt="downArrow"
        className={`w-[0.6vw] transition-all duration-[0.2s] ease-linear ${
          showVarients ? "rotate-180" : ""
        }`}
      />
    </div>
  );
};

export default ShowVarient;
