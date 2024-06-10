import ProductCard from "../../components/Products/ProductCard";
import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../../services/products/productApi";
import { BiSolidCircle } from "react-icons/bi";
import { ProductResponse, Product } from "../../types/Types";


const perPage = 6;

export default function NewArrivals() {
  const { data, error, isLoading } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState(0);

  console.log("helllooooo", data)

  useEffect(() => {
    console.log("Fetching data: isLoading?", isLoading, "Error:", error, "Products:", data);
  }, [isLoading, error, data]);

  if (isLoading) {
    console.log("Loading...");
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

  const productsList: Product[] = productsData.data;

  const next = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(productsList.length / perPage)));
  };

  const prev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const allProductsOnPage = productsList.slice(startIndex, endIndex);

  return (
    <div className="new-arrivals">
      <div className="arrivals-header py-5">
        <h1 className="text-3xl font-bold">New Arrivals</h1>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {allProductsOnPage.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="next-previous flex justify-center items-center gap-2 p-7">
        <BiSolidCircle onClick={prev} className={`cursor-pointer text-2xl ${ currentPage === 0 ? "text-grayColor" : ""}`}
        />
        <BiSolidCircle
          onClick={next}
          className={`cursor-pointer text-2xl ${
            currentPage >= Math.floor(productsList.length / perPage)
              ? "text-grayColor"
              : ""
          }`}
        />
      </div>
    </div>
  );
}
