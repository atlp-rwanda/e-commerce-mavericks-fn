import React from 'react';
import { Transaction } from '../../types/Types';

const transactions: Transaction[] = [
  {
    reference: '18342342342343',
    customer: 'John doe',
    product: 'T-shirts',
    date: '10 Mar, 4:32 am',
    status: 'Delivered',
    price: '$100',
  },
  {
    reference: '18342342342343',
    customer: 'John doe',
    product: 'T-shirts',
    date: '10 Mar, 4:32 am',
    status: 'Canceled',
    price: '$100',
  },
  {
    reference: '18342342342343',
    customer: 'John doe',
    product: 'T-shirts',
    date: '10 Mar, 4:32 am',
    status: 'Pending',
    price: '$100',
  },
  {
    reference: '18342342342343',
    customer: 'John doe',
    product: 'T-shirts',
    date: '10 Mar, 4:32 am',
    status: 'In review',
    price: '$100',
  },
  {
    reference: '18342342342343',
    customer: 'John doe',
    product: 'T-shirts',
    date: '10 Mar, 4:32 am',
    status: 'Pending',
    price: '$100',
  },
  {
    reference: '18342342342343',
    customer: 'John doe',
    product: 'T-shirts',
    date: '10 Mar, 4:32 am',
    status: 'In review',
    price: '$100',
  },
  {
    reference: '18342342342343',
    customer: 'John doe',
    product: 'T-shirts',
    date: '10 Mar, 4:32 am',
    status: 'In review',
    price: '$100',
  },
];

const statusColors: { [key: string]: string } = {
  'Delivered': 'bg-[#d1fae5] text-[#065f46]',
  'Canceled': 'bg-[#fee2e2] text-[#991b1b]',
  'Pending': 'bg-[#e9d5ff] text-[#6b21a8]',
  'In review': 'bg-[#fef3c7] text-[#854d0e]',
};

const TransactionTable: React.FC = () => {
  return (
    <div className='mt-3'>
      <div className='bg-[#ffffff] shadow-md rounded-lg p-6 border border-grayColor'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold'>Transactions</h2>
          <p className='text-sm text-[#6b7280]'>List of latest transactions</p>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-[#ffffff]'>
            <thead>
              <tr>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>REFERENCE NUMBER</th>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>CUSTOMER</th>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>PRODUCT</th>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>DATE</th>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>STATUS</th>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>{transaction.reference}</td>
                  <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>{transaction.customer}</td>
                  <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>{transaction.product}</td>
                  <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>{transaction.date}</td>
                  <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[transaction.status]}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>{transaction.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-4 flex justify-between'>
          <div>
            <button className='text-sm text-[#6b7280]'>Last 7 days</button>
          </div>
          <div>
            <button className='text-[#3b82f6] text-sm font-medium'>Full Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
