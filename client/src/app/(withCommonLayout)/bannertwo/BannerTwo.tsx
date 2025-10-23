import { apiBaseUrl } from "@/config/config";
import Image from "next/image";
import { TBanner } from "@/types";

interface BannerProps {
  banners: TBanner[];
}

const BannerTwo: React.FC<BannerProps> = ({ banners }) => {
  // ধরো তুমি শুধু প্রথম ব্যানার দেখাতে চাও:
  const banner = banners?.[0];

  // যদি তুমি সর্বশেষ ব্যানার দেখাতে চাও, তাহলে এটা দাও:
//   const banner = banners?.[banners.length - 1];

  if (!banner) return null;
  
  return (
    <div className="2xl:h-[700px] xl:h-[500px] lg:h-[400px] h-[250px] rounded relative">
      <Image
        src={apiBaseUrl + banner.image}
        alt="Banner"
        width={1600}
        height={600}
        className="w-full h-full object-cover rounded"
      />
    </div>
  );
};

export default BannerTwo;
