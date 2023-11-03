import { BannerType } from "@/services/api/banner";
import Image from "next/image";
import React from "react";

type CardProps = {
  banner: BannerType;
  shopName: string;
};

export default function Card({ banner, shopName }: CardProps) {
  return (
    <div>
      <Image
        src={`http://localhost:8000/images/${banner.image}`}
        alt='banner'
        width={200}
        height={300}
        className='object-cover'
      />
      <label>{shopName}</label>
    </div>
  );
}
