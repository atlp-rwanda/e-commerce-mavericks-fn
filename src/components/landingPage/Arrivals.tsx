import ProductCard from "../../utils/ProductCard";
import { Product } from '../../types/types';
import { BiSolidCircle } from "react-icons/bi";
import { useState } from "react";

const products: Product[] = [
  {
    id: 1,
    name: 'Apple Smart Watch',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Mossions Fushion',
  },
  {
    id: 2,
    name: 'Blue Denim Cap',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Denim Co.',
  },
  {
    id: 3,
    name: 'White T-Shirt',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Basic Wear',
  },
  {
    id: 4,
    name: 'Black T-shirt',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Leather World',
  },
  {
    id: 5,
    name: 'Sun Glasses',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Scarves & More',
  },
  {
    id: 4,
    name: 'Laptop stand',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1629317480872-45e07211ffd4?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Laptop stand',
  },
  {
    id: 5,
    name: 'Gold jewellery',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Gold jewellery',
  },
  
];

const perPage = 5;


export default function Arrivals() {
    const [currentPage, setCurrentPage] = useState(0);

    const next = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(products.length / perPage)));
    };
  
    const prev = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };
  
    const startIndex = currentPage * perPage;
    const endIndex = startIndex + perPage;
    const allProductsOnPage = products.slice(startIndex, endIndex);

  return (
    <div className="new-arrivals">
      <div className="arrivals-header py-5">
        <h1 className="text-3xl font-bold">New Arrivals</h1>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5">
        {allProductsOnPage.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="next-previous flex justify-center items-center gap-2 p-7">
        <BiSolidCircle onClick={prev} className={`cursor-pointer text-2xl ${currentPage === 0 ? 'text-gray-300' : ''}`} />
        <BiSolidCircle onClick={next} className={`cursor-pointer text-2xl ${currentPage >= Math.floor(products.length / perPage) ? 'text-gray-300' : ''}`} />
      </div>
    </div>
  )
}
