/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Navbar from '../../components/dashboard/Navbar';
import { Category as ICategory, Product } from '../../types/Types';
import { useGetCategoryQuery } from '../../services/categoryApi';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../services/productApi';
import { Bounce, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCrudProductBehaviour } from '../../redux/slices/productsSlice';

const EditProduct = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sizeInputs, setSizeInputs] = useState([{}]);
  const navigateTo = useNavigate();
  const { data: categoryData } = useGetCategoryQuery({});

  const { id } = useParams();

  const { data: productData } = useGetProductByIdQuery<any>(id!);
  const [productDetailData, setProductDetailData] = useState<Product | undefined>(undefined);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (productData) {
      const { data } = productData;
      setProductDetailData(data);
      setImages(productData.data.images);
      setSizeInputs(productData.data.sizes || [{}]);
    }

    if (categoryData) {
      const { data } = categoryData;
      setCategories(data);
    }
  }, [categoryData, productData]);

  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (productDetailData) {
      setValue('nameOfTheProduct', productDetailData.name);
      setValue('descriptionOfTheProduct', productDetailData.description);
      setValue('categoryNameOfTheProduct', productDetailData.categoryName);
      productDetailData.sizes.forEach((size, index) => {
        setValue(`size${index}`, size.size);
        setValue(`price${index}`, size.price);
        setValue(`stockQuantity${index}`, size.quantity);
        setValue(`discount${index}`, size.discount);
      });
    }
  }, [productDetailData, setValue]);

  const onSubmit: SubmitHandler<any> = async data => {
    const sizes = sizeInputs.map((_, index) => ({
      size: data[`size${index}`],
      price: data[`price${index}`],
      quantity: data[`stockQuantity${index}`],
      discount: data[`discount${index}`],
    }));

    const updatedData = {
      name: data.nameOfTheProduct,
      description: data.descriptionOfTheProduct,
      categoryName: data.categoryNameOfTheProduct,
      sizes: sizes,
    };
    const dispatch = useDispatch();

    try {
      const response = await updateProduct({ productId: id, updatedData }).unwrap();
      if (response.ok) {
        toast.success(response.message, {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });

        setTimeout(() => navigateTo('/seller/products'), 3000);
        dispatch(setCrudProductBehaviour(true));
      }
    } catch (error: any) {
      if (error.data && error.data.message) {
        toast.error(`Error: ${error.data.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  const addMoreSizes = () => {
    setSizeInputs([...sizeInputs, {}]);
  };

  return (
    <div className='p-2'>
      <Navbar location='Edit Product' page='seller' />
      <div className='max-w-4xl mx-auto mt-7 md:ml-80 p-6 bg-[#ffffff] rounded-lg shadow-md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-2xl font-bold mb-6 text-[#000000]'>Edit Product details</h2>
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <div className='mb-3'>
                <label className='block text-sm font-medium text-[#374151]'>Product Name</label>
                <input
                  type='text'
                  {...register('nameOfTheProduct', { required: true })}
                  className='mt-1 block w-full px-3 py-2 border border-[#d1d5db] rounded-md shadow-sm'
                  placeholder='Type name'
                />
              </div>
              <div className='col-span-2 mb-3'>
                <label className='block text-sm font-medium text-[#374151]'>Description</label>
                <textarea
                  {...register('descriptionOfTheProduct', { required: true })}
                  className='mt-1 block w-full px-3 py-2 border border-[#d1d5db] rounded-md shadow-sm h-28'
                  placeholder='Type description'
                ></textarea>
              </div>
              <div className='mb-3'>
                <label className='block text-sm font-medium text-[#374151]'>Category</label>
                <select
                  {...register('categoryNameOfTheProduct', { required: true })}
                  className='mt-1 block w-full px-3 py-2 border border-[#d1d5db] rounded-md shadow-sm'
                >
                  <option value=''>Choose Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {sizeInputs.map((_, index) => (
                <div key={index} className='mb-3'>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='mb-3'>
                      <label className='block text-sm font-medium text-[#374151]'>Price</label>
                      <input
                        type='number'
                        {...register(`price${index}`, { required: true })}
                        className='mt-1 block w-full px-3 py-2 border border-[#d1d5db] rounded-md shadow-sm'
                        placeholder='$xxx'
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='block text-sm font-medium text-[#374151]'>
                        Discount <span className='text-[#6b7280] text-xs font-light'>Optional</span>
                      </label>
                      <input
                        type='number'
                        {...register(`discount${index}`)}
                        className='mt-1 block w-full px-3 py-2 border border-[#d1d5db] rounded-md shadow-sm'
                        placeholder='xx'
                      />
                    </div>
                  </div>
                  <div className='mb-3'>
                    <label className='block text-sm font-medium text-[#374151]'>Stock Quantity</label>
                    <input
                      type='number'
                      {...register(`stockQuantity${index}`, { required: true })}
                      className='mt-1 block w-full px-3 py-2 border border-[#d1d5db] rounded-md shadow-sm'
                      placeholder='xxx'
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='block text-sm font-medium text-[#374151]'>
                      Size <span className='text-[#6b7280] text-xs font-light'>Optional</span>
                    </label>
                    <input
                      type='text'
                      {...register(`size${index}`)}
                      className='mt-1 block w-full px-3 py-2 border border-[#d1d5db] rounded-md shadow-sm'
                      placeholder='xxx'
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <label className='block text-sm font-medium text-[#374151]'>Product Gallery</label>
              <div className='mt-4 grid grid-cols-3 gap-2'>
                {images.map((image, index) => (
                  <div key={index} className='relative'>
                    <img src={image} className='w-24 h-24 object-cover rounded' />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='mt-6 flex justify-end space-x-4'>
            <button className='text-[#6b7280] font-light rounded p-3 bg-[#EFF4FE] text-white' onClick={addMoreSizes}>
              Add more sizes
            </button>
            <button
              type='submit'
              className='px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#ffffff] bg-[#319795] hover:bg-[#2c7a7b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#319795]'
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update product'}
            </button>
            <button
              type='button'
              className='px-6 py-2 border border-[#d1d5db] rounded-md shadow-sm text-sm font-medium text-[#374151] bg-[#ffffff] hover:bg-[#f3f4f6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f46e5]'
              onClick={() => {
                reset();
                navigateTo('/seller/products');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProduct;
