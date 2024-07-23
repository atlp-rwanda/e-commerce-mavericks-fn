import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../../services/userApi';
import { updateUserInfo } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { setActiveMenu } from '../../redux/slices/buyerDashboard';

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const [email, setEmail] = useState<string>('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [firstNameState, setFirstName] = useState<string>('');
  const [lastNameState, setLastName] = useState<string>('');

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email || '');
      setProfilePhoto(userInfo.photoUrl || null);
      setFirstName(userInfo.firstName || '');
      setLastName(userInfo.lastName || '');
    }
  }, [userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('firstName', firstNameState);
      formData.append('lastName', lastNameState);
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }
      if (userInfo?.id) {
        const res = await updateUser({ userId: userInfo.id, data: formData }).unwrap();
        dispatch(updateUserInfo(res.data));
        alert('Profile updated successfully');
        dispatch(setActiveMenu({ activeMenu: "account" }))
      } else {
        alert('User ID is not available');
      }
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="max-w-md bg-whiteColor p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={firstNameState}
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={lastNameState}
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePhoto">
            Profile Photo
          </label>
          <input
            type="file"
            id="profilePhoto"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
          {profilePhoto && <img src={profilePhoto} alt="Profile" className="mt-4 w-20 h-20 rounded-full object-cover" />}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-darkGreen hover:bg-greenColor text-whiteColor font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
