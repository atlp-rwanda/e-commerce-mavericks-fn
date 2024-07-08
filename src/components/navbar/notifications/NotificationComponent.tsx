import { BiDotsVertical } from 'react-icons/bi';
import { cn } from '../../../utils';
import { useEffect, useRef, useState } from 'react';
import {
  useMarkNotificationAsReadMutation,
  useDeleteSingleNotificationsMutation,
} from '../../../services/notificationsAPI';
import { FaSpinner } from 'react-icons/fa6';

interface NotificationProps {
  id: string;
  message: string;
  time: string;
  date: string;
  isRead: boolean;
  onDelete: (id: string) => void;
  onReadChange: (isRead: boolean) => void;
}
const NotificationComponent = ({
  message,
  time,
  date,
  isRead: initialIsRead,
  id,
  onDelete,
  onReadChange,
}: NotificationProps) => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isRead, setIsRead] = useState(initialIsRead);
  const menubarRef = useRef<HTMLDivElement>(null);
  const [markNotificationAsRead, { isLoading }] = useMarkNotificationAsReadMutation();
  const [deleteNotification, { isLoading: isDeleting }] = useDeleteSingleNotificationsMutation();
  const markAsRead = async () => {
    const { data } = await markNotificationAsRead({ isRead: !isRead, id });
    setIsRead(data.data.isRead);
    onReadChange(data.data.isRead);
  };
  const notificationDelete = () => {
    deleteNotification(id);
    onDelete(id);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menubarRef.current && !menubarRef.current.contains(event.target as Node)) {
        setIsMenuClicked(false);
      }
    };

    if (isMenuClicked) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuClicked]);

  return (
    <div
      className={cn(
        'w-full gap-2 flex items-center relative p-2',
        isRead
          ? 'bg-blackColor md:bg-grayColor md:text-blackColor text-whiteColor text-opacity-50 md:text-opacity-40 '
          : 'bg-blackColor md:bg-grayColor md:text-blackColor text-whiteColor'
      )}
      key={id}
    >
      <span className='w-full'>
        <span className='flex justify-between'>
          <p className='text-sm'>{message}</p>
          <p
            className={cn('text-xs font-medium italic text-skyBlueText hidden', isRead ? 'hidden' : 'hidden md:block')}
          >
            Unread
          </p>
          <div
            className={cn('w-3 h-3 rounded-full  bg-skyBlueText md:hidden', isRead ? 'hidden' : 'block md:hidden')}
          ></div>
        </span>
        <span className='w-full text-xs flex justify-between items-center italic'>
          <p className='italic font-light'>{date} </p>
          <p className='italic font-light'>{time}</p>
        </span>
      </span>
      <button
        onClick={e => {
          e.preventDefault();
          setIsMenuClicked(!isMenuClicked);
        }}
      >
        <BiDotsVertical className=' aspect-square max-w-8 w-20 ' />
      </button>
      {isMenuClicked && (
        <div
          ref={menubarRef}
          className={cn(
            'absolute top-10 right-0 bg-white shadow-customShadow border text-sm text-greenColor font-medium flex flex-col gap-2 items-start  rounded-xl transition-all z-20 bg-whiteColor overflow-hidden',
            isMenuClicked ? 'scale-1 origin-top' : 'h-0 scale-0 origin-top'
          )}
        >
          <button
            onClick={notificationDelete}
            className=' hover:bg-greenColor hover:text-whiteColor bg-whiteColor text-greenColor p-2 w-full text-left'
          >
            <FaSpinner className={cn('w-3 h-3 ', isDeleting ? 'block animate-spin ' : 'hidden')} /> Delete
          </button>
          <button
            onClick={markAsRead}
            className=' hover:bg-greenColor hover:text-whiteColor bg-whiteColor text-greenColor p-2 w-full text-left'
          >
            <FaSpinner className={cn('w-3 h-3 ', isLoading ? 'block animate-spin ' : 'hidden')} />{' '}
            {isRead ? 'Mark as Unread' : 'Mark as Read'}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
