import React from "react";
import logo from "../assest/monklogo.png";

const Navbar = () => {
  return (
    <div className="w-full flex items-center gap-x-[1vw] px-[1vw] py-[1vw] border-b">
      <img src={logo} alt="logo" className="w-[2vw] h-[2vw]" />
      <h5 className="fs-16 text-[#7E8185] font-[600]">
        Monk Upsell & Cross-sell
      </h5>
    </div>
  );
};

export default Navbar;
