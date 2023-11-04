"use client";
import { BannerType } from "@/services/api/banner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type CardProps = {
  banner: BannerType;
  shopName: string;
};

export default function Card({ banner, shopName }: CardProps) {
  const router = useRouter();
  return (
    <div
      className=' border border-solid w-fit border-neutral-400 p-2 rounded-md cursor-pointer
    flex flex-col gap-4'
      onClick={() => router.push(`/shop/${banner.shopId}`)}
    >
      <Image
        src={`http://localhost:8000/images/${banner.image}`}
        alt='banner'
        width={200}
        height={300}
        className='object-cover'
      />
      <div>{shopName}</div>
    </div>
  );
}
