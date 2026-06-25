import React from "react";
import { Headphones } from "lucide-react";

const Header = ({ title, description }) => {
  return (
    <div className="w-full px-7 pt-8 md:mt-10 md:flex md:h-16.5 md:items-center md:justify-between md:px-10 md:pt-0">
      <div className="flex w-full flex-col gap-2 md:h-16.5 md:w-82 md:gap-1">
        <h1 className="text-[30px] font-semibold leading-9 text-[#030B1F] md:text-[20px] md:leading-6 md:text-black">
          {title}
        </h1>

        <p className="text-[19px] font-normal leading-7 text-[#586B88] md:text-[12px] md:leading-4.75 md:text-[#666666]">
          {description}
        </p>
      </div>

      <div className="mt-7 flex h-9.5 w-full items-center gap-4 md:mt-0 md:w-39.25 md:gap-2">
        <div className="flex h-10 w-10 items-center justify-center md:h-9.5 md:w-9.5">
          <Headphones
            size={34}
            strokeWidth={1.5}
            className="text-[#1F2937] md:h-6 md:w-6 md:text-[#141414]"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[16px] font-normal leading-5 text-[#586B88] md:text-[12px] md:leading-4.75 md:text-[#141414]">
            Need Help?
          </span>

          <button className="text-left text-[16px] font-semibold leading-5 text-[#096B58] underline md:text-[12px] md:font-medium md:leading-4.75">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
