import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaPaperPlane, FaComments, FaTimes } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import chatAvatar from '../../assets/team.jpeg';
import { chatSchema, ChatData } from '../../utils/schemas';
import { useGetMessagesQuery, useSendMessageMutation } from '../../services/chatApi';
import { useAppSelector, useAppDispatch } from '../../hooks/customHooks';
import { ChatMessage } from '../../types/Types';
import { useGetUserByIdQuery } from '../../services/userApi';
import { setProfile } from '../../redux/slices/userSlice';
const Chat: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const userToken = useAppSelector(state => state.user.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const scrollDown = useRef<HTMLDivElement>(null);
  // set profile image
  const profileImage: string | null = useAppSelector(state => state.user.photoUrl);
  const userId = useAppSelector(state => state.user.userId);
  const { data, isError, isSuccess, isLoading } = useGetMessagesQuery(userToken as string, { skip: !userToken });
  const { data: userData } = useGetUserByIdQuery(userId, { skip: !userId });

  const [messageList, setMessageList] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setMessageList(data?.chat);
      console.log('dt', data);
      if (showChat) {
        scrollDown.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if (userData) {
        console.log(userData);
        dispatch(setProfile(userData.message.photoUrl));
      }
    }
  }, [data, isSuccess, showChat, dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatData>({ resolver: zodResolver(chatSchema) });

  const handleOpenChat = useCallback(() => {
    userToken ? setShowChat(true) : (setShowChat(false), navigate('/login'));
  }, [userToken, navigate]);

  const handleCloseChat = useCallback(() => setShowChat(false), []);

  const [sendMessage] = useSendMessageMutation();

  const handleMessageSubmit: SubmitHandler<ChatData> = async (data: ChatData) => {
    const sendChatData = { ...data, senderId: userId as string };
    await sendMessage(sendChatData);
    setMessageList((currentMessage: ChatMessage[] | any) => [...(currentMessage || []), sendChatData]);
    reset();
    scrollDown.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!userToken) {
    const handleNavigate = () => navigate('/login');
    return (
      <button onClick={handleNavigate} className='fixed right-5 bottom-5 text-greenColor text-4xl'>
        <FaComments />
      </button>
    );
  }

  return (
    <>
      <div className='fixed bottom-5 right-5 z-50'>
        <button onClick={handleOpenChat} className='text-greenColor text-4xl z-50'>
          <FaComments className={showChat ? 'hidden' : ''} />
        </button>
      </div>

      {showChat && (
        <div className='fixed inset-0 z-40 flex items-center justify-end  mx-2 sm:mr-6'>
          <div className='w-9/10 max-w-sm h-3/4 rounded-2xl shadow-xl relative bg-grayColor overflow-hidden '>
            <div className='header bg-darkGreen flex justify-between items-center px-6 py-3  text-white'>
              <div className='flex items-center gap-4'>
                <img
                  src={`${profileImage !== null ? profileImage : chatAvatar}`}
                  alt='Mavericks'
                  className='w-12 h-12 rounded-full object-cover object-center'
                />
                <div className='ml-4 text-whiteColor'>
                  <p>Mavericks Public</p>
                  <span className='flex items-center'>
                    <svg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <circle cx='4' cy='4' r='4' fill='#0E9F6E' />
                    </svg>
                    <span className='ml-2'>online</span>
                  </span>
                </div>
              </div>
              <div className='flex items-center'>
                <button
                  className='text-2xl text-whiteColor transition-all  hover:text-grayColor mr-2'
                  onClick={handleCloseChat}
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            <div className='messages-container h-2/3 p-6 flex-1 overflow-y-auto bg-[url(/assets/chatback.png)] bg-grayColor'>
              <div className='introduction bg-[#767171] text-center rounded-2xl p-4 mb-6 text-[#ebe2e2]'>
                {errors.root ? (
                  <h1 className='font-semibold text-[#ff0000]'>{errors.root.message}</h1>
                ) : (
                  <>
                    <h1 className='font-semibold text-lg'>Welcome to Mavericks E-commerce website!</h1>
                    <p className='text-sm'>
                      We’re excited to help you with exclusive services we have, let’s know how we can help you!
                    </p>
                  </>
                )}
              </div>
              <ul className='messages-list flex flex-col gap-4 text-whiteColor'>
                {isLoading ? (
                  <div className='flex flex-col gap-4'>
                    <div className='relative flex flex-col w-full animate-pulse gap-3 p-4'>
                      <div className='flex-1 w-[80%]'>
                        <div className='h-6  rounded-lg bg-[gray] text-sm'></div>
                      </div>
                      <div className='flex-1 w-[80%] self-end'>
                        <div className='h-6  rounded-lg bg-[#aaa5a5] text-sm'></div>
                      </div>
                      <div className='flex-1 w-[80%]'>
                        <div className='h-6  rounded-lg bg-grayColor text-sm'></div>
                      </div>
                    </div>
                    <div className='relative flex flex-col w-full animate-pulse gap-3 p-4 self-end'>
                      <div className='flex-1  w-[80%] self-end'>
                        <div className='h-6 rounded-lg bg-[gray] text-sm'></div>
                      </div>
                      <div className='flex-1 w-[80%]'>
                        <div className='h-6  rounded-lg bg-[#aaa5a5] text-sm'></div>
                      </div>
                      <div className='flex-1 w-[80%] self-end'>
                        <div className='h-6  rounded-lg bg-grayColor text-sm'></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  messageList?.map(msg => (
                    <li
                      key={msg.id}
                      className={`p-2 relative rounded-2xl text-sm max-w-chat text-blackColor flex gap-2 items-center justify-start ${
                        userId === msg.senderId
                          ? 'bg-[#95e795] text-white self-end'
                          : 'bg-[#ffffff] text-white self-start'
                      }`}
                    >
                      {/* render image as the user has one or an icon */}

                      <span
                        className={` text-greenColor flex flex-col items-center ${userId === msg.senderId ? 'hidden' : ''}`}
                      >
                        {msg.User?.photoUrl !== null ? (
                          <img src={msg.User?.photoUrl} alt={msg.User?.firstName} className='h-8 w-8 rounded-full' />
                        ) : (
                          <FaUserCircle size={24} />
                        )}
                        <span className='text-[10px] absolute -top-4 left-2'>{msg.User?.firstName}</span>
                      </span>

                      <span>{msg.content}</span>
                    </li>
                  ))
                )}
                {isError && <p className='tex-sm text-redColor text-center'>Error getting the messages!</p>}
                <div ref={scrollDown}></div>
              </ul>
            </div>
            <form
              className='flex gap-4 p-4 border-t border-greenColor bg-grayColor relative'
              onSubmit={handleSubmit(handleMessageSubmit)}
            >
              <textarea
                {...register('content')}
                className={`flex-1 p-2 border rounded-2xl outline-none md:resize-none h-9 sm:h-20 overflow-hidden ${
                  errors.content ? 'border-redColor' : 'border-darkGreen '
                }`}
              ></textarea>
              <button type='submit' className='text-greenColor cursor-pointer' disabled={!!errors.content}>
                <FaPaperPlane size={32} className='rotate-45' />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
