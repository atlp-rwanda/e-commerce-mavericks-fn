import React, { useState, useMemo } from 'react';

interface Column {
  key: string;
  label: string;
  isImage?: boolean;
  render?: (item: any) => React.ReactNode;
}

interface TableProps {
  data: any[];
  columns: Column[];
  itemsPerPage: number;
}

const getInitials = (firstName: string, lastName: string) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Table: React.FC<TableProps> = ({ data, columns, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(
    () =>
      data.filter(item =>
        columns.some(column => String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [data, columns, searchTerm]
  );

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const renderCell = (item: any, column: Column) => {
    if (column.isImage) {
      return item[column.key] ? (
        <img
          src={item[column.key]}
          alt={`${item.firstName} ${item.lastName}`}
          className='ml-2 w-10 h-10 rounded-full object-cover'
        />
      ) : (
        <div
          className='ml-2 w-10 h-10 flex items-center justify-center text-whiteColor font-bold text-lg rounded-full uppercase'
          style={{ backgroundColor: getRandomColor() }}
        >
          {getInitials(item.firstName, item.lastName)}
        </div>
      );
    }
    if (column.render) return column.render(item);
    return column.key.includes('.')
      ? column.key.split('.').reduce((obj, key) => obj && obj[key], item)
      : item[column.key];
  };

  return (
    <div className='overflow-x-auto pl-4'>
      <div className='mb-2 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Users Management</h1>
        <input
          type='text'
          placeholder='Search user...'
          value={searchTerm}
          onChange={handleSearch}
          className='px-2 py-1 border rounded outline-none'
        />
      </div>
      <table className='min-w-full bg-whiteColor px-10'>
        <thead className='bg-[#F3F4F6]'>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                onClick={() => !column.isImage && handleSort(column.key)}
                className={`pl-4 py-4 text-left text-sm font-bold text-[#6B7280] uppercase tracking-wider ${!column.isImage ? 'cursor-pointer' : ''}`}
              >
                {column.label}
                {!column.isImage && sortColumn === column.key && <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-[#F9FAFB]' : 'bg-whiteColor'}>
              {columns.map(column => (
                <td key={column.key} className='px-2 py-2 whitespace-nowrap text-sm'>
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-4 flex flex-col sm:flex-row justify-between items-center'>
        <div className='mb-2 sm:mb-0 text-sm'>
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
          {sortedData.length} entries
        </div>
        <div className='flex justify-center'>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='px-3 py-1 border rounded mr-2 text-sm'
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='px-3 py-1 border rounded text-sm'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
