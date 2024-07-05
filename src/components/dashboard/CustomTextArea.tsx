import React from 'react';

interface ICustomTextArea {
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  cols?: number;
}

const CustomTextArea: React.FC<ICustomTextArea> = ({ name, value, onChange, placeholder, className, rows, cols }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      rows={rows}
      cols={cols}
    />
  );
};

export default CustomTextArea;
