import React from "react";
import logo from "../assest/monklogo.png";

const Navbar = () => {
  return (
    <div className="w-full h-[8%] flex items-center gap-x-[1rem] px-[1rem]">
      <img src={logo} alt="logo" className="w-[2rem] h-[2rem]" />
      <h5 className="text-[1rem] text-[#7E8185] font-[600]">
        Monk Upsell & Cross-sell
      </h5>
    </div>
  );
};

export default Navbar;
