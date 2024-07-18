// src/pages/admin/Settings.tsx

import React, { useState } from 'react';
import { FiSave, FiUser, FiLock, FiBell, FiGlobe, FiShield, FiRefreshCcw } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings: React.FC = () => {
  const defaultGeneralSettings = {
    siteName: 'Mavericks',
    siteUrl: 'https://mavericks.nijohn.dev',
    adminEmail: 'admin.mavericks@gmail.com',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    theme: 'light',
    profilePicture: '',
  };

  const defaultSecuritySettings = {
    twoFactorAuth: false,
    passwordExpiration: 90,
    loginAttempts: 5,
    minPasswordLength: 8,
    specialCharRequirement: true,
  };

  const defaultNotificationSettings = {
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    newsletterFrequency: 'weekly',
  };

  const [generalSettings, setGeneralSettings] = useState(defaultGeneralSettings);
  const [securitySettings, setSecuritySettings] = useState(defaultSecuritySettings);
  const [notificationSettings, setNotificationSettings] = useState(defaultNotificationSettings);

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'file' ? (e.target as HTMLInputElement).files?.[0]?.name : e.target.value;
    setGeneralSettings({ ...generalSettings, [e.target.name]: value });
  };

  const handleSecuritySettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setSecuritySettings({ ...securitySettings, [e.target.name]: value });
  };

  const handleNotificationSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setNotificationSettings({ ...notificationSettings, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings saved:', { generalSettings, securitySettings, notificationSettings });
    toast.success('Settings saved successfully!');
  };

  const handleReset = () => {
    setGeneralSettings(defaultGeneralSettings);
    setSecuritySettings(defaultSecuritySettings);
    setNotificationSettings(defaultNotificationSettings);
    toast.info('Settings reset to default values!');
  };

  return (
    <div className='container mx-auto p-6 lg:pl-60'>
      <h1 className='text-3xl font-bold mb-6'>Admin Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-[#EFF4FE] p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4 flex items-center'>
              <FiGlobe className='mr-2' /> General Settings
            </h2>
            <div className='space-y-4'>
              <div>
                <label htmlFor='siteName' className='block text-sm font-medium text-[#374151]'>
                  Site Name
                </label>
                <input
                  type='text'
                  id='siteName'
                  name='siteName'
                  value={generalSettings.siteName}
                  onChange={handleGeneralSettingsChange}
                  className='mt-1 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                />
              </div>
              <div>
                <label htmlFor='siteUrl' className='block text-sm font-medium text-[#374151]'>
                  Site URL
                </label>
                <input
                  type='url'
                  id='siteUrl'
                  name='siteUrl'
                  value={generalSettings.siteUrl}
                  onChange={handleGeneralSettingsChange}
                  className='mt-1 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                />
              </div>
              <div>
                <label htmlFor='adminEmail' className='block text-sm font-medium text-[#374151]'>
                  Admin Email
                </label>
                <input
                  type='email'
                  id='adminEmail'
                  name='adminEmail'
                  value={generalSettings.adminEmail}
                  onChange={handleGeneralSettingsChange}
                  className='mt-1 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                />
              </div>
              <div>
                <label htmlFor='dateFormat' className='block text-sm font-medium text-[#374151]'>
                  Date Format
                </label>
                <select
                  id='dateFormat'
                  name='dateFormat'
                  value={generalSettings.dateFormat}
                  onChange={handleGeneralSettingsChange}
                  className='mt-1 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                >
                  <option value='MM/DD/YYYY'>MM/DD/YYYY</option>
                  <option value='DD/MM/YYYY'>DD/MM/YYYY</option>
                  <option value='YYYY-MM-DD'>YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label htmlFor='timeFormat' className='block text-sm font-medium text-[#374151]'>
                  Time Format
                </label>
                <select
                  id='timeFormat'
                  name='timeFormat'
                  value={generalSettings.timeFormat}
                  onChange={handleGeneralSettingsChange}
                  className='mt-1 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                >
                  <option value='12-hour'>12-hour</option>
                  <option value='24-hour'>24-hour</option>
                </select>
              </div>
              <div>
                <label htmlFor='theme' className='block text-sm font-medium text-[#374151]'>
                  Theme
                </label>
                <select
                  id='theme'
                  name='theme'
                  value={generalSettings.theme}
                  onChange={handleGeneralSettingsChange}
                  className='mt-1 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                >
                  <option value='light'>Light</option>
                  <option value='dark'>Dark</option>
                </select>
              </div>
              <div className='flex items-center'>
                <FiUser className='mr-2 text-[#374151]' aria-hidden='true' />
                <label htmlFor='profilePicture' className='block text-sm font-medium text-[#374151]'>
                  Profile Picture
                </label>
                <input
                  type='file'
                  id='profilePicture'
                  name='profilePicture'
                  onChange={handleGeneralSettingsChange}
                  className='ml-2 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                />
              </div>
            </div>
          </div>

          <div className='bg-[#EFF4FE] p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4 flex items-center'>
              <FiShield className='mr-2' /> Security Settings
            </h2>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='twoFactorAuth'
                  name='twoFactorAuth'
                  checked={securitySettings.twoFactorAuth}
                  onChange={handleSecuritySettingsChange}
                  className='rounded border-[#D1D5DB] text-[#4F46E5] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50'
                />
                <label htmlFor='twoFactorAuth' className='ml-2 block text-sm text-[#111827]'>
                  Enable Two-Factor Authentication
                </label>
              </div>
              <div>
                <label htmlFor='passwordExpiration' className='block text-sm font-medium text-[#374151]'>
                  Password Expiration (days)
                </label>
                <input
                  type='number'
                  id='passwordExpiration'
                  name='passwordExpiration'
                  value={securitySettings.passwordExpiration}
                  onChange={handleSecuritySettingsChange}
                  className='mt-1 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                />
              </div>
              <div>
                <label htmlFor='loginAttempts' className='block text-sm font-medium text-[#374151]'>
                  Max Login Attempts
                </label>
                <input
                  type='number'
                  id='loginAttempts'
                  name='loginAttempts'
                  value={securitySettings.loginAttempts}
                  onChange={handleSecuritySettingsChange}
                  className='mt-1 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                />
              </div>
              <div>
                <label htmlFor='minPasswordLength' className='block text-sm font-medium text-[#374151]'>
                  Minimum Password Length
                </label>
                <input
                  type='number'
                  id='minPasswordLength'
                  name='minPasswordLength'
                  value={securitySettings.minPasswordLength}
                  onChange={handleSecuritySettingsChange}
                  className='mt-1 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                />
              </div>
              <div className='flex items-center'>
                <FiLock className='mr-2 text-[#374151]' aria-hidden='true' />
                <input
                  type='checkbox'
                  id='specialCharRequirement'
                  name='specialCharRequirement'
                  checked={securitySettings.specialCharRequirement}
                  onChange={handleSecuritySettingsChange}
                  className='rounded border-[#D1D5DB] text-[#4F46E5] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50'
                />
                <label htmlFor='specialCharRequirement' className='ml-2 block text-sm text-[#111827]'>
                  Require Special Character in Password
                </label>
              </div>
            </div>
          </div>

          <div className='bg-[#EFF4FE] p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4 flex items-center'>
              <FiBell className='mr-2' /> Notification Settings
            </h2>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='emailNotifications'
                  name='emailNotifications'
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationSettingsChange}
                  className='rounded border-[#D1D5DB] text-[#4F46E5] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50'
                />
                <label htmlFor='emailNotifications' className='ml-2 block text-sm text-[#111827]'>
                  Enable Email Notifications
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='pushNotifications'
                  name='pushNotifications'
                  checked={notificationSettings.pushNotifications}
                  onChange={handleNotificationSettingsChange}
                  className='rounded border-[#D1D5DB] text-[#4F46E5] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50'
                />
                <label htmlFor='pushNotifications' className='ml-2 block text-sm text-[#111827]'>
                  Enable Push Notifications
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='smsNotifications'
                  name='smsNotifications'
                  checked={notificationSettings.smsNotifications}
                  onChange={handleNotificationSettingsChange}
                  className='rounded border-[#D1D5DB] text-[#4F46E5] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50'
                />
                <label htmlFor='smsNotifications' className='ml-2 block text-sm text-[#111827]'>
                  Enable SMS Notifications
                </label>
              </div>
              <div>
                <label htmlFor='newsletterFrequency' className='block text-sm font-medium text-[#374151]'>
                  Newsletter Frequency
                </label>
                <select
                  id='newsletterFrequency'
                  name='newsletterFrequency'
                  value={notificationSettings.newsletterFrequency}
                  onChange={handleNotificationSettingsChange}
                  className='mt-1 block w-full rounded-md border-[#D1D5DB] shadow-sm focus:border-[#A5B4FC] focus:ring focus:ring-[#C7D2FE] focus:ring-opacity-50 pl-4 py-1'
                >
                  <option value='daily'>Daily</option>
                  <option value='weekly'>Weekly</option>
                  <option value='monthly'>Monthly</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex space-x-4'>
          <button
            type='submit'
            className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366F1]'
          >
            <FiSave className='mr-2 -ml-1 h-5 w-5' aria-hidden='true' />
            Save Settings
          </button>
          <button
            type='button'
            onClick={handleReset}
            className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D97706] hover:bg-[#B45309] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59E0B]'
          >
            <FiRefreshCcw className='mr-2 -ml-1 h-5 w-5' aria-hidden='true' />
            Reset to Default
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Settings;
