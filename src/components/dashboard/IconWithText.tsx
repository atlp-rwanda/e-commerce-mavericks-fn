import React from 'react';

interface IconWithTextProps {
  icon: React.ReactNode;
  text: string;
}

const IconWithText: React.FC<IconWithTextProps> = ({ icon, text }) => (
  <div className='flex items-center gap-2'>
    {icon}
    <span className='text-sm'>{text}</span>
  </div>
);

export default IconWithText;

