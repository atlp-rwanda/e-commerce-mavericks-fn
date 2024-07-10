import { mavericksApi } from '.';
import { ChatMessage } from '../types/Types';
import io from 'socket.io-client';

const token = localStorage.getItem('token');
export const chatApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query<{ chat: ChatMessage[] }, string>({
      query: token => ({
        url: 'chats',
        headers: {
          Authorization: token,
        },
      }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        if (typeof arg !== 'undefined') {
          const socket = io('https://e-commerce-mavericcks-bn-staging-istf.onrender.com', { auth: { token } });
          try {
            await cacheDataLoaded;
            socket.on('returnMessage', (newMessage: any) => {
              updateCachedData(draft => {
                draft.chat.push(newMessage);
              });
            });
          } catch (err) {
            console.error(err);
          }
          await cacheEntryRemoved;
          socket.close();
        }
      },
    }),
    sendMessage: builder.mutation<void, { content: string; senderId: string }>({
      queryFn: body => {
        const socket = io('https://e-commerce-mavericcks-bn-staging-istf.onrender.com', {
          auth: { token },
        });
        socket.emit('sentMessage', body);
        return { data: undefined };
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatApi;
