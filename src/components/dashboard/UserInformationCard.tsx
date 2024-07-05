import { FaPhoneAlt, FaRegEdit } from 'react-icons/fa';
import { PiGenderIntersexFill } from 'react-icons/pi';
import { HiOutlineMail } from 'react-icons/hi';
import { SlLocationPin } from 'react-icons/sl';
import IconWithText from '../../components/dashboard/IconWithText';

export const UserInformationCard = () => {
  return (
    <div className='p-2'>
      <div className='flex gap-4 w-full shadow-md border-[1.5px] border-greenColor  p-2 rounded-sm'>
        <div className='w-1/4 flex items-center justify-center'>
          <img
            src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className='rounded-full h-16 w-16 border-2 border-greenColor'
          />
        </div>
        <div className='flex-1 space-y-1'>
          <p className='font-medium'>Munezero Ange</p>
          <IconWithText icon={<HiOutlineMail color='#007A7A' />} text={'munezero05200@gmail.com'} />
          <div className='flex justify-between'>
            <IconWithText icon={<PiGenderIntersexFill color='#007A7A' />} text={'Male'} />
            <IconWithText icon={<FaPhoneAlt color='#007A7A' />} text={'0783172388'} />
          </div>
          <IconWithText icon={<SlLocationPin color='#007A7A' />} text={'Kigali-Rwanda'} />
          <IconWithText icon={<FaRegEdit color='#007A7A' />} text={'Edit profile'} />
        </div>
      </div>
    </div>
  );
};
