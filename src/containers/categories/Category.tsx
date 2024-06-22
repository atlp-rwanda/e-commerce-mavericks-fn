import React from "react"
import { useNavigate } from "react-router-dom";

interface CategoryProps {
    image: string,
    name: string
}

const Category:React.FC<CategoryProps> =({image, name}) =>{
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/categories/${name}`);
  };
  return (
    <div className="single-category flex justify-center gap-1 flex-col cursor-pointer relative w-56 p-4" onClick={handleClick}>
      <img src={image? image: "https://cdn-icons-png.freepik.com/512/4194/4194687.png"} alt="Category" className=' h-48 rounded-md object-cover hover:w-56 hover:h-56'/>
      <p className="text-blackColor font-bold flex justify-center">{name}</p>
      <div className="absolute inset-0 hover:bg-blackColor hover:bg-opacity-20 rounded-md"></div>
  </div>
  )
}

export default Category