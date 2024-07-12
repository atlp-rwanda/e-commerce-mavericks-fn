// TableRow.tsx
import React from 'react';

interface TableRowProps {
  referenceNumber: string;
  customer: string;
  product: string;
  date: string;
  status: string;
  price: string;
}

const TableRow: React.FC<TableRowProps> = ({ referenceNumber, customer, product, date, status, price }) => {
  return (
    <tr>
      <td className='px-4 py-2 border-b'>{referenceNumber}</td>
      <td className='px-4 py-2 border-b'>{customer}</td>
      <td className='px-4 py-2 border-b'>{product}</td>
      <td className='px-4 py-2 border-b'>{date}</td>
      <td className='px-4 py-2 border-b'>{status}</td>
      <td className='px-4 py-2 border-b'>{price}</td>
    </tr>
  );
};

export default TableRow;
