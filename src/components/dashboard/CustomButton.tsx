import React from 'react';

interface ICustomButton {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<ICustomButton> = ({ label, onClick, type = 'button', className, disabled = false }) => {
  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {label}
    </button>
  );
};

export default CustomButton;
