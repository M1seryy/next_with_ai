import Banner from "@/components/Banner";
import Category from "@/components/Category";
import Header from "@/components/Header";
import Products from "@/components/Products";

export default async function Home() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 ">
      <Header />
      <Banner />
      <Category />
      <Products />
    </div>
  );
}
