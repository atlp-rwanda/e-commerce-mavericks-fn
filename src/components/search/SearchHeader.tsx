import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { cn } from '../../utils';

interface SearchParamProps {
  searchQuery: string;
}
const SearchHeader = ({ searchQuery }: SearchParamProps) => {
  const [sortInfoHidden, setSortInfoHidden] = useState(true);

  return (
    <>
      <div className='p-3 md:p-4 xl:px-10 '>
        <p className='font-medium text-lg border-b-2  pb-1 md:text-xl md:border-b-[3px] md:pb-3 flex flex-col md:flex-row md:justify-between'>
          <span>
            Search Results for
            <span className='text-xl font-bold md:text-2xl self-start justify-self-start ms-2'>"{searchQuery}"</span>
          </span>
          <button
            className='w-fit p-2 font-medium text-sm rounded-lg border border-overlay
          flex flex-row items-center  gap-2 text-greenColor transition-all relative'
            onClick={() => setSortInfoHidden(!sortInfoHidden)}
          >
            Sort By
            <LuChevronDown className='w-5' />
            <div
              className={cn(
                ' rounded-lg bg-whiteColor absolute top-9 right-0 md:right-1 shadow-customShadow flex flex-col overflow-hidden transition-all z-10',
                sortInfoHidden ? 'h-0 hidden' : 'h-fit flex'
              )}
            >
              <span className='text-sm p-2 font-medium w-full text-wrap md:text-nowrap text-darkGreen hover:text-whiteColor  hover:bg-overlay  transition-all '>
                Name Ascending
              </span>
              <span className='text-sm p-2 font-medium w-full text-wrap md:text-nowrap text-darkGreen hover:text-whiteColor  hover:bg-overlay  transition-all '>
                Name Descending
              </span>
              <span className='text-sm p-2 font-medium w-full text-wrap md:text-nowrap text-darkGreen hover:text-whiteColor  hover:bg-overlay  transition-all '>
                Date Added
              </span>
            </div>
          </button>
        </p>
      </div>
    </>
  );
};

export default SearchHeader;
