import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../services/userApi';
import Input from '../common/Input';
import { useSelector } from 'react-redux';

export interface UserFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  photoUrl?: any;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const id = useSelector((state: any) => state.user.userId);

  const { data } = useGetUserByIdQuery(id);
  const [userData, setUserData] = useState(data?.message);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>();

  useEffect(() => {
    if (data?.message) {
      setUserData(data.message);
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      setValue('firstName', userData.firstName);
      setValue('lastName', userData.lastName);
      setValue('email', userData.email);
      setValue('phoneNumber', userData.phoneNumber);
    }
  }, [userData, setValue]);

  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<UserFormValues> = async data => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('email', data.email);
    if (data.photoUrl && data.photoUrl.length > 0) {
      formData.append('profileImage', data.photoUrl[0]);
    }

    try {
      const response = await updateUser(formData).unwrap();
      setUserData(response.message);
      setIsEditing(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); 
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const getErrorMessage = (error: any) => {
    if ('data' in error) {
      return error.data?.message || 'Error updating profile';
    } else {
      return 'An unexpected error occurred';
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='flex flex-col items-center'>
        {showSuccessMessage && (
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-5/12 bg-[#38a169] text-[#ffffff] p-4 rounded-lg mb-6 text-center'>
            Profile updated successfully!
          </div>
        )}
        <h1 className='text-3xl font-bold my-6 text-[#000000]'>My Profile</h1>
        <div className='w-full md:w-8/12 lg:w-6/12 xl:w-5/12 border border-[#d1d5db] p-6 rounded-lg shadow-md mb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <img
                className='h-24 w-24 rounded-full'
                src={userData?.photoUrl || '/default-profile.png'}
                alt={userData?.firstName}
              />
              <div className='ml-4'>
                <div className='text-2xl font-medium text-[#000000]'>
                  {userData?.firstName} {userData?.lastName}
                </div>
                <p className='text-[#6b7280] font-light mt-1'>{userData?.role}</p>
              </div>
            </div>
            <button
              type='button'
              className='p-3 rounded-lg bg-[#d1d5db] hover:bg-[#9ca3af] transition-all text-[#000000] font-bold'
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        </div>
        {isEditing && (
          <div className='w-full md:w-8/12 lg:w-6/12 xl:w-5/12 border border-[#d1d5db] rounded-xl p-8 shadow-md'>
            <h2 className='text-xl font-semibold mb-4 text-[#000000]'>Personal Information</h2>
            {isError && error && (
              <p className='text-lg bg-[#f56565] text-[#ffffff] mt-4 py-2 rounded-lg px-3'>{getErrorMessage(error)}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-[#000000]'>Profile Picture</label>
                <input type='file' accept='image/*' className='mt-2' {...register('photoUrl')} />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='text-[#000000]'>
                  <Input
                    id='firstName'
                    label='First Name'
                    type='text'
                    placeholder='Enter first name'
                    {...register('firstName')}
                    error={errors?.firstName?.message}
                  />
                </div>
                <div className='text-[#000000]'>
                  <Input
                    id='lastName'
                    label='Last Name'
                    type='text'
                    placeholder='Enter last name'
                    {...register('lastName')}
                    error={errors?.lastName?.message}
                  />
                </div>
              </div>
              <div className='text-[#000000]'>
                <Input
                  id='phoneNumber'
                  label='Contact Number'
                  type='tel'
                  placeholder='Enter your contact number'
                  {...register('phoneNumber')}
                  error={errors?.phoneNumber?.message}
                />
              </div>
              <div className='text-[#000000]'>
                <Input
                  id='email'
                  label='Email'
                  type='email'
                  disabled
                  placeholder='Enter your email'
                  {...register('email')}
                  error={errors?.email?.message}
                />
              </div>
              <div className='flex justify-between gap-4'>
                <button
                  type='submit'
                  className='p-3 rounded-lg bg-[#38a169] hover:bg-[#2f855a] transition-all text-[#ffffff] font-bold'
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? 'Loading...' : 'Save'}
                </button>
                <button
                  type='button'
                  onClick={() => setIsEditing(false)}
                  className='p-3 rounded-lg bg-[#d1d5db] hover:bg-[#9ca3af] transition-all text-[#000000]'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
