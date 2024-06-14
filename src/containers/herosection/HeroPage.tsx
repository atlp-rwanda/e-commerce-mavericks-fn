import { useState, useEffect } from 'react';
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { TbTruck } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import Category from '../categories/Category';
import NewArrivals from '../Arrivals/NewArrivals';
import FeaturedProduct from '../FeaturedProducts/FeaturedProducts';


const categories = [
  {
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Electronics"
  },
  {
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Fashion"
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Books"
  },
  {
    image: "https://images.unsplash.com/photo-1523575708161-ad0fc2a9b951?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Home & Garden"
  },
  {
    image: "https://images.unsplash.com/photo-1576438162986-c685b1cfed7a?q=80&w=1576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Sports"
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1684795780266-ecd819f04f96?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Toys"
  },
  {
    image: "https://images.unsplash.com/photo-1556982962-dc0ee0f77f47?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Automotive"
  },
  {
    image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Beauty"
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Health"
  },
  {
    image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Music"
  },
  {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Travel"
  },
  {
    image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Music"
  },
  {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Travel"
  },
  
];

function HeroPage() {
  const images = [
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://noticiasconcursos.com.br/wp-content/uploads/2023/08/noticiasconcursos.com.br-novo-iphone-da-apple-ja-tem-data-prevista-para-lancamento-veja-quando-09-iphone-15-750x430.jpg",
    "https://media.istockphoto.com/id/1170348086/photo/black-headphones-isolated-on-white-background-flat-lay-top-view-copy-space-music-concept.webp?s=170667a&w=0&k=20&c=7laDBNwNFtg0_BDSy2coo8oZMyYK9TofQzZBa-nuG3c="
  ];

  // hero images auto display
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 md:p-4 xl:px-10 mt-24">
      <div className="hero-container flex flex-col-reverse md:grid md:grid-cols-3 md:gap-4">
        <div className="small-images grid grid-cols-2 md:flex md:flex-col md:gap-1 md:col-span-1">
          <div className="upper-image relative">
            <img
                src="https://image.gazetevatan.com/i/gazetevatan/75/1200x675/65004ecee14f2adf329c06c9.jpg"
                alt="Hot Phones"
                className="w-full h-[150px] md:h-[250px] object-cover rounded-sm"
              />
            <p className="absolute inset-0 flex items-center justify-center text-white hover:bg-greenColor text-whiteColor hover:text-whiteColor hover:bg-opacity-50 p-2 rounded text-3xl font-roboto font-extrabold text-center">Hot Sells from new Arrivals</p>
          </div>
          <div className=" relative lower-image">
            <img
                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Best Shoes in Town"
                className="w-full h-[150px] md:h-[250px] object-cover rounded-sm"
              />
            <p className="absolute inset-0 flex items-center justify-center text-white hover:bg-greenColor hover:text-whiteColor hover:bg-opacity-50 p-2 rounded text-3xl text-center font-roboto font-extrabold">Enjoy Black Friday Discount</p>
          </div>
        </div>
        <div className="large-image relative max-h-[250px] md:max-h-[500px] md:col-span-2">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Sliding ${index + 1}`}
                className={`w-full h-[250px] md:h-[500px] object-cover rounded-sm ${index === currentImageIndex ? "" : "hidden"}`}
              />
            ))}
          <p className="absolute inset-0 flex items-center justify-center text-white hover:bg-greenColor hover:text-whiteColor hover:bg-opacity-50 p-2 rounded text-5xl text-center font-roboto font-extrabold"></p>
        </div>
      </div>
      <div className="category-header py-10">
        <h1 className='text-2xl font-bold'>Shop By Category Here:</h1>
      </div>
      <div className="categories flex flex-row gap-4 overflow-x-auto snap-x">
        {categories.map((cat, index) => (
          <div key={index} className="snap-start">
            <Category image={cat.image} category={cat.category} />
          </div>
        ))}
      </div>
      <div className="banner py-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        <div className="smater-value flex justify-center items-center gap-2 font-bold text-xl">SMARTER VALUES, GREAT DEALS</div>
        <div className="dollar flex justify-center items-center flex-col gap-2">
          <AiOutlineDollarCircle className='text-4xl' />
          <div className="text text-center">
            <h1 className='text-md font-bold pb-2'>Value-For-Money</h1>
            <p className="text-sm">We offer compentitive price over millions of items</p>
          </div>
        </div>
        <div className="dollar flex justify-center items-center flex-col gap-2">
          <MdOutlinePeopleAlt  className='text-4xl' />
          <div className="text text-center">
            <h1 className='text-md font-bold pb-2'>Shoppers worldwide</h1>
            <p className="text-sm">More than 300 millions shoppers form 200+ countries & region</p>
          </div>
        </div>
        <div className="dollar flex justify-center items-center flex-col gap-2">
          <TbTruck  className='text-4xl' />
          <div className="text text-center">
            <h1 className='text-md font-bold pb-2'>Fast delivery</h1>
            <p className="text-sm">Faster delivery on selected items. Thanks to our improved logistics</p>
          </div>
        </div>
        <div className="dollar flex justify-center items-center flex-col gap-2">
          <MdOutlinePayment  className='text-4xl' />
          <div className="text text-center">
            <h1 className='text-md font-bold pb-2'>Safe payments</h1>
            <p className="text-sm">Safe payment methods preferred by international shoppers</p>
          </div>
        </div>
        <div className="dollar flex justify-center items-center flex-col gap-2">
          <IoShieldCheckmarkOutline  className='text-4xl' />
          <div className="text text-center">
            <h1 className='text-md font-bold pb-2'>Buyer protection</h1>
            <p className="text-sm">Get refund if item arrived late or not as described</p>
          </div>
        </div>
      </div>
      {/* New Arrivals */}
      <div className="new-arrivals">
        <NewArrivals />
      </div>
      {/* Featured Products */}
      <div className="featured-products">
        <FeaturedProduct />
      </div>
    </div>
  );
}

export default HeroPage;
