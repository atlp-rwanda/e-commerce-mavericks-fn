import React, { useState } from 'react';
import { useUpdatePasswordMutation } from '../../services/authAPI'; // Import the mutation hook

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatePassword] = useUpdatePasswordMutation(); // Use the mutation hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match!');
      return;
    }

    // Confirmation box
    const isConfirmed = window.confirm('Are you sure you want to reset your password?');

    if (!isConfirmed) {
      return; 
    }

    try {
      const response = await updatePassword({ oldPassword, newPassword }).unwrap();
      alert(response.message);
    } catch (error) {
      console.log('Failed to update password', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl">
      <h1 className="text-3xl font-bold mb-10">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group flex gap-4">
          <label
            className="block text-gray-700 font-medium w-40"
            htmlFor="current-password"
          >
            Old Password
          </label>
          <input
            type="password"
            id="current-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Current password"
            required
          />
        </div>
        <div className="form-group flex items-center gap-4">
          <label
            className="block text-gray-700 font-medium w-40"
            htmlFor="new-password"
          >
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="New password"
            required
          />
        </div>
        <div className="form-group flex gap-4">
          <label
            className="block text-gray-700 font-medium w-40"
            htmlFor="confirm-password"
          >
            Confirm
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Confirm new password"
            required
          />
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            className="w-40 py-2 bg-darkGreen text-whiteColor rounded-md hover:bg-greenColor transition duration-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
