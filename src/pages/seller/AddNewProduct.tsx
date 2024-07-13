/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Navbar from '../../components/dashboard/Navbar';
import { FaImage } from 'react-icons/fa6';
import { Category as ICategory } from '../../types/Types';
import { useGetCategoryQuery } from '../../services/categoryApi';
import { useCreateProductMutation } from '../../services/productApi';
import { IoWarningOutline } from 'react-icons/io5';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [sizeInputs, setSizeInputs] = useState([{}]);
  const navigateTo = useNavigate();
  const { data: categoryData, refetch } = useGetCategoryQuery({});

  useEffect(() => {
    if (categoryData) {
      const { data } = categoryData;
      setCategories(data);
    } else {
      refetch();
    }
  }, [categoryData, refetch]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => file.type.startsWith('image/') && file.size <= 5000000);
      setProductImages([...productImages, ...validFiles]);
      setImagePreviews([...imagePreviews, ...validFiles.map(file => URL.createObjectURL(file))]);
    }
  };

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<any> = async data => {
    const sizes = sizeInputs.map((_, index) => ({
      size: data[`size${index}`],
      price: data[`price${index}`],
      quantity: data[`stockQuantity${index}`],
    }));

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('categoryName', data.categoryName);
    formData.append('sizes', JSON.stringify(sizes));
    productImages.forEach(image => {
      formData.append('images', image);
    });

    try {
      const response = await createProduct(formData).unwrap();
      if (response.ok) {
        toast.success(response.message, {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });

        // Reset the form
        reset();
        setProductImages([]);
        setSizeInputs([{}]);
        navigateTo('/seller/products');
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
      <Navbar location='Add New Product' page='seller' />
      <div className='max-w-4xl mx-auto mt-7 md:ml-80 p-6 bg-[#ffffff] rounded-lg shadow-md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-2xl font-bold mb-6 text-[#000000]'>Product details</h2>
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <div className='mb-3'>
                <label className='block text-sm font-medium text-[#374151]'>Product Name</label>
                <input
                  type='text'
                  {...register('name', { required: true })}
                  className='mt-1 block w-full px-3 py-2 border border-[#d1d5db] rounded-md shadow-sm'
                  placeholder='Type name'
                />
              </div>
              <div className='col-span-2 mb-3'>
                <label className='block text-sm font-medium text-[#374151]'>Description</label>
                <textarea
                  {...register('description', { required: true })}
                  className='mt-1 block w-full px-3 py-2 border border-[#d1d5db] rounded-md shadow-sm h-28'
                  placeholder='Type description'
                ></textarea>
              </div>
              <div className='mb-3'>
                <label className='block text-sm font-medium text-[#374151]'>Category</label>
                <select
                  {...register('categoryName', { required: true })}
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
              <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-[#d1d5db] rounded-md'>
                <div className='space-y-1 text-center'>
                  <FaImage className='mx-auto h-16 w-16 text-[#9ca3af]' />
                  <div className='flex text-sm text-[#4b5563]'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer bg-[#ffffff] rounded-md font-medium text-[#4f46e5] hover:text-[#4338ca] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#4f46e5]'
                    >
                      <span className='text-center'>Upload a file</span>
                      <input
                        id='file-upload'
                        type='file'
                        className='sr-only'
                        multiple
                        {...register('image')}
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <p className='text-xs text-[#6b7280]'>JPEGs & PNGs are only format allowed</p>
                  <div className='flex items-center'>
                    <IoWarningOutline className='mr-2' />
                    <p className='text-xs text-[#6b7280]'>Each product should have at least 4 images.</p>
                  </div>
                </div>
              </div>
              <div className='mt-4'>
                <div className='mt-4 grid grid-cols-3 gap-2'>
                  {imagePreviews.map((src, index) => (
                    <div key={index} className='relative'>
                      <img src={src} alt={`Product preview ${index + 1}`} className='w-24 h-24 object-cover rounded' />
                    </div>
                  ))}
                </div>
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
              {isLoading ? 'Adding...' : 'Add product'}
            </button>
            <button
              type='button'
              className='px-6 py-2 border border-[#d1d5db] rounded-md shadow-sm text-sm font-medium text-[#374151] bg-[#ffffff] hover:bg-[#f3f4f6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f46e5]'
              onClick={() => {
                reset();
                setProductImages([]);
                setImagePreviews([]);
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

export default AddProductForm;
