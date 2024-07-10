import { BiDotsVertical } from 'react-icons/bi';
import NotificationComponent from './NotificationComponent';
import {
  useGetNotificationsQuery,
  useDeleteAllNotificationsMutation,
  useMarkAllNotificationsAsReadMutation,
} from '../../../services/notificationsAPI';
import { useSelector } from 'react-redux';
import { cn } from '../../../utils';
import { NotificationProps } from '../../../types/Types';
import { useEffect, useRef, useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';

export const Notifications = () => {
  const user = useSelector((state: any) => state.user);
  const userId = user.userId ? user.userId.replace(/"/g, '') : '';
  const [mainMenuClicked, setMainMenuClicked] = useState(false);

  const mainMenuRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [unRead, setUnRead] = useState<number>(0);

  const { data: fetchedNotifications, isLoading, isError } = useGetNotificationsQuery(userId);

  const [deleteAll, { isLoading: areAllDeleting, isSuccess: areDeleted }] = useDeleteAllNotificationsMutation();
  const [markAll, { isLoading: areAllUpdating, isSuccess: areAllUpdated }] = useMarkAllNotificationsAsReadMutation();
  useEffect(() => {
    if (fetchedNotifications) {
      setNotifications(fetchedNotifications.data);
    }
  }, [fetchedNotifications]);

  useEffect(() => {
    setUnRead(notifications.filter((notification: NotificationProps) => !notification.isRead).length);
  }, [notifications]);
  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      if (mainMenuRef && !mainMenuRef.current?.contains(e.target as Node)) {
        setMainMenuClicked(false);
      }
    };
    if (mainMenuClicked) {
      document.addEventListener('mousedown', handleOutClick);
    } else {
      document.removeEventListener('mousedown', handleOutClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutClick);
    };
  }, [mainMenuClicked]);
  useEffect(() => {
    if (areAllUpdated) {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification => ({
          ...notification,
          isRead: true,
        }))
      );

      setUnRead(0);
    }
  }, [areAllUpdated]);
  useEffect(() => {
    if (areDeleted) {
      setNotifications([]);
      setUnRead(0);
    }
  }, [areDeleted]);
  if (isLoading)
    return (
      <div className='w-full mx-auto my-2 p-2 rounded-xl shadow-customShadow flex flex-col gap-2 bg-blackColor md:bg-whiteColor md:text-blackColor text-whiteColor'>
        <div className='w-full mx-auto h-12 bg-blackColor  bg-opacity-15 rounded-xl animate-pulse '></div>
        <div className='w-full mx-auto h-12 bg-blackColor  bg-opacity-15 rounded-xl animate-pulse '></div>
      </div>
    );

  const handleDelete = (id: string) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };
  const handleReadChange = (isRead: boolean) => {
    if (isRead) setUnRead(unRead - 1);
    else setUnRead(unRead + 1);
    return;
  };
  const handleDeleteAll = () => {
    deleteAll(userId);
  };
  const handleMarkAll = () => {
    markAll({ userId, isRead: true });
  };
  return (
    <div className='w-full mx-auto my-2 pb-2 rounded-xl shadow-customShadow  bg-blackColor md:bg-grayColor md:text-blackColor text-whiteColor'>
      <div className='w-full gap-2'>
        <span className='w-full px-2 pb-2 flex justify-between items-center border-b-2 p-3'>
          <span className='flex gap-2'>
            <h2 className='font-medium text-lg'>Notifications</h2>
            <p className=' bg-greenColor text-whiteColor rounded-full text aspect-square p-2 w-5 h-5 grid place-content-center text-xs'>
              {unRead}
            </p>
          </span>
          <span className='relative'>
            <button
              onClick={e => {
                e.preventDefault();
                setMainMenuClicked(!mainMenuClicked);
              }}
            >
              <BiDotsVertical className=' aspect-square max-w-8 w-20 ' />
            </button>
            {mainMenuClicked && (
              <div
                className={cn(
                  'absolute right-2 top-5 z-20 flex flex-col   w-fit text-sm text-nowrap  rounded-lg bg-whiteColor shadow-xl items-start transition-all font-medium overflow-hidden',
                  mainMenuClicked ? 'scale-1 origin-top' : 'scale-0 origin-top'
                )}
                ref={mainMenuRef}
              >
                <button
                  onClick={handleDeleteAll}
                  className=' hover:bg-greenColor hover:text-whiteColor bg-whiteColor text-greenColor p-2 w-full text-left flex gap-1 items-center'
                >
                  <FaSpinner className={cn('w-3 h-3 ', areAllDeleting ? 'block animate-spin ' : 'hidden')} /> Delete All
                </button>
                <button
                  className=' hover:bg-greenColor hover:text-whiteColor bg-whiteColor text-greenColor p-2 w-full text-left flex gap-1 items-center'
                  onClick={handleMarkAll}
                >
                  <FaSpinner className={cn('w-3 h-3 ', areAllUpdating ? 'block animate-spin ' : 'hidden')} /> Mark All
                  as Read
                </button>
              </div>
            )}
          </span>
        </span>
        {isError ? (
          !userId ? (
            <p className=' w-full p-3 text-xs min-h-10'> You need to sign in first</p>
          ) : (
            <p className=' w-full p-3 text-xs min-h-10'>Notification could not be fetched. Please try again</p>
          )
        ) : (
          <div
            className='w-full flex flex-col gap-2  max-h-[500px] overflow-y-auto'
            key={areAllUpdated || areDeleted ? 'yes' : 'No'}
          >
            {notifications.map((notification: NotificationProps) => {
              const mainDate = new Date(notification.createdAt);
              const date = `${mainDate.getDate()}/${mainDate.getMonth() + 1}/${mainDate.getFullYear()}`;
              const time = `${mainDate.getHours()}:${mainDate.getMinutes()}`;
              return (
                <NotificationComponent
                  key={notification.id}
                  id={notification.id}
                  message={notification.message}
                  date={date}
                  time={time}
                  isRead={notification.isRead}
                  onDelete={handleDelete}
                  onReadChange={handleReadChange}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
