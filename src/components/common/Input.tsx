import { forwardRef } from 'react';
import { cn } from '../../utils';

interface InputProps {
  type: string;
  label?: string;
  id: string;
  placeholder: string;
  error?: string;
  labelClassName?: string;
  inputClasname?: string;
}

// Use React.forwardRef to forward the ref to the input element
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, labelClassName, inputClasname, label, id, placeholder, error = '', ...rest }, ref) => {
    return (
      <label className={cn('flex flex-col gap-1 font-normal flex-1 text-sm', labelClassName)}>
        {label}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={cn('p-2 px-3 rounded-full border border-greenColor outline-none font-normal', inputClasname)}
          ref={ref}
          {...rest}
        />
        {error && <p className='text-redColor text-xs font-light'>{error}</p>}
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;
