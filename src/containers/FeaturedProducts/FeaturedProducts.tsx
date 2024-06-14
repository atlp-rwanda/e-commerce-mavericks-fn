import { useEffect } from "react";
import ProductCard from "../../components/Products/ProductCard";
import { Product, ProductResponse } from '../../types/Types';
import { useGetProductsQuery } from "../../services/products/productApi";



export default function FeaturedProduct() {
  const { data, error, isLoading } = useGetProductsQuery();


  useEffect(() => {
    console.log("Fetching data: isLoading?", isLoading, "Error:", error, "Products:", data);
  }, [isLoading, error, data]);

  if (isLoading) {
    console.log("Loading...");
    // Optionally display a loading indicator
    return null;
  }

  if (error) {
    console.log("Error loading products:", error);
    // Optionally display an error indicator
    return null;
  }

  const productsData: ProductResponse = data as unknown as ProductResponse;

  if (!productsData) {
    console.log("No products data received");
    return null;
  }

  // Extracting the list of products from the response
  const productsList: Product[] = productsData.data;
  return (
    <div className="featured-products pb-5">
      <div className="featured-header py-5">
        <h1 className="text-3xl font-bold">Featured Products</h1>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {productsList.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}