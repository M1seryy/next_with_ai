import Banner from "@/components/Banner";
import Category from "@/components/Category";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 ">
      <Header />
      <Banner />
      <Category />
    </div>
  );
}
