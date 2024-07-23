import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/customHooks';
import { enable2FA as set2FA } from '../../redux/slices/userSlice';
import { useEnable2FAMutation } from '../../services/Enable2FAApi';
import { useGetUserByIdQuery } from '../../services/userApi';
import { toast } from 'react-toastify';
const Enable2FA = () => {
  const userId = useAppSelector(state => state.user.userId);
  const { data: userData,  isSuccess: isUserFetched } = useGetUserByIdQuery(userId);

  const initialState = useAppSelector(state => state.user.is2FAEnabled) as boolean;
  const token = useAppSelector(state => state.user.token) as string;
  const [enabled, setEnabled] = useState<boolean>(initialState);
  const dispatch = useAppDispatch();
  const [enable2FA, { isError }] = useEnable2FAMutation();
  const handleEnabling = async () => {
    try {
      setEnabled(!enabled);
      dispatch(set2FA(enabled));
      await enable2FA(token).unwrap();
      if (initialState === true && enabled) toast.success('Disabled 2 factor Authentication');
      if (!enabled) toast.success('Enabled 2 factor Authentication');
    } catch (err) {
      toast.error('Error handling 2 factor authentication!');
    }
  };
  useEffect(() => {
    if (isError) dispatch(set2FA(!enabled));
    if (isUserFetched) {
      dispatch(set2FA(userData.message.enable2FA));
      setEnabled(userData.message.enable2FA);
    }
  }, [enabled, dispatch, isError, setEnabled]);
  return (
    <div className='flex gap-4 bg-grayColor lg:w-1/3  sm:mx-0 md:w-1/2 lg:ml-2 md:ml-[10%] sm:2/3 w-4/5 mx-auto justify-center items-center py-4 rounded-md px-4'>
      <label htmlFor='enable2fa'>Enable / Disable Two Factor Authentication</label>
      <input type='checkbox' id='enable2fa' onChange={() => handleEnabling()} checked={enabled} />
    </div>
  );
};

export default Enable2FA;
