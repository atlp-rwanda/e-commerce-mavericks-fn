import { clsx, ClassValue } from 'clsx';
import { Bounce, ToastPosition } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const toastConfig = {
  position: 'top-right' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
};
