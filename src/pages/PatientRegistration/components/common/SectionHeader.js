import React from "react";

const SectionHeader = ({ title, description }) => {
  return (
    <div className="mb-7">
      <h1 className="m-0 text-[22px] font-bold text-slate-900">{title}</h1>
      <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-400">{description}</p>
    </div>
  );
};

export default SectionHeader;
