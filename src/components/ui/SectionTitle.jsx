import React from "react";

const SectionTitle = ({ children, className = "", style }) => {
  return (
    <h2
      className={`text-center text-[22px] font-bold sm:text-[24px] md:text-[26px] xl:text-[28px] ${className}`}
      style={style}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
