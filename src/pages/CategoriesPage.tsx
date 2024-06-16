import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';

const CategoriesPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const renderCategoryContent = (category: string) => {
    switch (category) {
      case 'Plus':
        return <div>Content for Plus</div>;
      case 'Flash Sales':
        return <div>Content for Flash Sales</div>;
      case 'Babies':
        return <div>Content for Babies</div>;
      case 'Fathers':
        return <div>Content for Fathers</div>;
      case 'Books':
          return <div>Content for Books</div>;
      case 'Toys':
          return <div>Content for Toys</div>;
      case 'Electronics':
        return <div>Content for Electronics</div>;
      case 'Beauty':
        return <div>Content for Beauty</div>;
      case 'Fashion':
          return <div>Content for Fashion</div>;
      case 'Beauty':
          return <div>Content for Beauty</div>;
      case 'Sports':
        return <div>Content for Sports</div>;
      default:
        return (
            <div>Category Not Found</div>
        )
    }
  };

  return (
    <div>
      <Navbar />
      <div className="py-56 flex justify-center items-center bg-darkGreen text-4xl text-whiteColor">
        {renderCategoryContent(categoryId!)}
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
