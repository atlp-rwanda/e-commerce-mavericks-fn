import { forwardRef } from 'react';

interface SelectProps {
  placeholder: string;
  error?: string;
  options: string[];
}
const Select = forwardRef<HTMLSelectElement, SelectProps>(({ placeholder, options,error,...rest }, ref) => {
  return (
    <>
      <select ref={ref} name='role' id='role' className='p-2 outline-0 border border-blackColor flex-1 rounded-lg' {...rest}>
        <option value=''>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option[0].toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
      <p className='text-redColor text-xs -mt-3'>{error}</p>
    </>
  );
});

export default Select;
