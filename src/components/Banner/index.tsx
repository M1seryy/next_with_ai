import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="w-full h-[400px] relative rounded-lg">
      <Image src="/banner.png" alt="shoeBanner" fill className="object-cover" />
    </div>
  );
};

export default Banner;
