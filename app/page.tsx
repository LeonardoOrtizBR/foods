import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

const name ="";

const Home = () => {
  return (
    <>
      <Header/>
      <div className="px-5 pt-6">
        <Search  />
      </div>
      <div className="px-5 pt-6">
        <CategoryList/>
      </div>
      <div className="px-5 pt-6">
        <Image src="/promo-banner-01.svg" alt="Até 30% de desconto em pizzas" width={0} height={0} className="w-full h-auto" sizes="100vw"/>
      </div>
    </>
  )
}

export default Home;