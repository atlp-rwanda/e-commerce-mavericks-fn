import React, { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="sm:px-[10px] md:px-[50px] lg:px-[100px] xl:px-[150px]">
      {children}
    </div>
  )
};

export default Wrapper;
