import { forwardRef } from 'react';
import { cn } from '../../utils';

interface SelectProps {
  placeholder: string;
  error?: string;
  options: string[];
  label: string;
}
const Select = forwardRef<HTMLSelectElement, SelectProps>(({ placeholder, options, label, error, ...rest }, ref) => {
  return (
    <>
      <label className={cn('flex flex-col gap-1 font-normal flex-1 text-sm')}>
        {label}
        <select ref={ref} name='role' id='role' className='p-2 outline-0 border border-blackColor flex-1 rounded-full' {...rest}>
          <option value=''>{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option[0].toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        <p className='text-redColor text-xs -mt-3'>{error}</p>
      </label>
    </>
  );
});

export default Select;
