import { forwardRef } from 'react';

interface ICustomInput {
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const CustomInput = forwardRef<HTMLInputElement, ICustomInput>(
  ({ id, type = 'text', name, value, onChange, placeholder, className }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
