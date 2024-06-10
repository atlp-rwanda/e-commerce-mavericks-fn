import React from "react"

interface CategoryProps {
    image: string,
    category: string
}

const Category:React.FC<CategoryProps> =({image, category}) =>{
  return (
    <div className="single-category flex justify-center gap-1 flex-col cursor-pointer relative w-56 p-4">
      <img src={image} alt="Category" className=' h-48 rounded-md object-cover hover:w-56 hover:h-56'/>
      <p className="text-blackColor font-bold">{category}</p>
      <div className="absolute inset-0 hover:bg-blackColor hover:bg-opacity-50 rounded-md"></div>
  </div>
  )
}

export default Category