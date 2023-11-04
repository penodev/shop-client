"use client";

import Card from "@/components/ui-components/card";
import { BannerType, getBanner } from "@/services/api/banner";
import { ShopType, getShopById } from "@/services/api/shop";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

type ShopPageProps = {
  params: { id: string };
};

export default function ShopPage({ params }: ShopPageProps) {
  const [banner, setBanner] = useState<BannerType>();
  const [shop, setShop] = useState<ShopType>();

  useEffect(() => {
    const fetchData = async () => {
      const banners = await getBanner();

      const shop = await getShopById(Number(params.id));
      setShop(shop);
      setBanner(
        banners?.find((banner: BannerType) => banner.shopId === shop.id)
      );
    };
    fetchData();
  }, []);

  return (
    <div className='flex gap-16 justify-center'>
      <div className='flex flex-col'>
        <div>{shop?.name}</div>
        {!!banner?.image && (
          <Image
            src={`http://localhost:8000/images/${banner.image}`}
            alt='banner'
            width={200}
            height={300}
            className='object-cover'
          />
        )}
      </div>
      {!!shop?.lat && !!shop?.lng && (
        <MapContainer
          center={[shop.lat, shop.lng]}
          zoom={12}
          scrollWheelZoom={false}
          className='h-[40vw] w-1/2'
          //   style={{ margin: "auto", width: "100%", height: "600px" }}
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

          {!!shop && (
            <Marker
              // draggable={true}
              position={[shop?.lat, shop?.lng]}
            >
              <Popup>{shop?.name}</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
}
