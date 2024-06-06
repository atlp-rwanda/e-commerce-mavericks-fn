import ProductCard from "../../utils/ProductCard";
import { Product } from '../../types/types';

const products: Product[] = [
  {
    id: 1,
    name: 'Sony Headphones',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1583305727488-61f82c7eae4b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Mossions Fushion',
  },
  {
    id: 2,
    name: 'Bose Speaker',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1520860100614-a714deb4805f?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Bose',
  },
  {
    id: 3,
    name: 'Fifine microphone',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1535045366656-4c59fca1dd93?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Apple',
  },
  {
    id: 4,
    name: 'Water Glass',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Mossions Fushion',
  },
  {
    id: 5,
    name: 'Glass plate',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1499028203764-8669cfd05719?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Bose',
  },
  {
    id: 6,
    name: 'Iphone 14 Pro',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Apple',
  },
  {
    id: 7,
    name: 'Jordan Air 2022',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1698609467326-fab7045d773c?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Mossions Fushion',
  },
  {
    id: 8,
    name: 'Knitted Girl cloth',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1605&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Bose',
  },
  {
    id: 9,
    name: 'Apple Watch',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Apple',
  },
  {
    id: 10,
    name: 'Macbook pro',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    manufacturer: 'Apple',
  }
];

export default function FeaturedProduct() {
  return (
    <div className="featured-products pb-5">
      <div className="featured-header py-5">
        <h1 className="text-3xl font-bold">Featured Products</h1>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
