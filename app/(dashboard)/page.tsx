"use client";

import Card from "@/components/ui-components/card";
import { BannerType, getBanner } from "@/services/api/banner";
import { ShopType, getShop } from "@/services/api/shop";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [shopList, setShopList] = useState<ShopType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const banners = await getBanner();
      setBanners(banners);
      const shopList = await getShop();
      setShopList(shopList);
    };
    fetchData();
  }, []);

  return (
    <div className='grid grid-cols-4 p-16'>
      {banners.map((item) => {
        const shop = shopList?.find((shop) => shop.id === item.shopId);
        return <Card key={item.id} banner={item} shopName={shop?.name || ""} />;
      })}
    </div>
  );
}
