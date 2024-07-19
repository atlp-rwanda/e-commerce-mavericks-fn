import React, { useState } from 'react';
import { Button } from './ui/button';
import { useGetOrdersQuery } from "../services/ordersApi";
import { Order } from "../types/Types";
import { CiSearch } from 'react-icons/ci';

const statusColors: { [key: string]: string } = {
  'delivered': 'bg-[#d1fae5] text-[#065f46]',
  'cancelled': 'bg-[#fee2e2] text-[#991b1b]',
  'pending': 'bg-[#e9d5ff] text-[#6b21a8]',
  'paid': 'bg-[#fef3c7] text-[#854d0e]',
};

const itemsPerPage = 15;

const TransactionTable: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: ordersData, isLoading, isError } = useGetOrdersQuery();
  const orders = ordersData?.data || [];

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredTransactions = selectedStatus === 'all'
    ? orders
    : orders.filter((transaction: Order) => transaction.status.toLowerCase() === selectedStatus);

  const searchedTransactions = searchQuery
    ? filteredTransactions.filter((transaction: Order) =>
        transaction.orderItems.some((item) =>
          item.products.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : filteredTransactions;

  const totalPages = Math.ceil(searchedTransactions.length / itemsPerPage);

  const currentTransactions = searchedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading orders.</div>;
  }

  return (
    <div className='md:ml-64 p-4'>
      <div className='bg-[#ffffff] shadow-md rounded-lg p-6 border border-grayColor'>
        <div className='mb-4 flex justify-between items-center'>
          <div>
            <h2 className='text-lg font-semibold'>Orders Details</h2>
            <p className='text-sm text-[#8F88f]'>Manage orders</p>
          </div>
          <div className='flex items-center rounded bg-whiteColor p-2 border border-grayColor'>
            <CiSearch className='mr-1.5 text-[#A08D8D]' size={20} />
            <input
              type='text'
              placeholder='Search orders'
              className='border-none outline-none'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <nav className="flex gap-4 sm:gap-6 text-sm font-medium">
          {["all", "paid", "pending", "delivered", "canceled"].map(status => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'primary' : 'outline'}
              onClick={() => handleStatusChange(status)}
              className="px-4 py-2 rounded-md"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </nav>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-[#ffffff]'>
            <thead>
              <tr>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>Order ID</th>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>CUSTOMER</th>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>PRODUCT</th>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>DATE</th>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>STATUS</th>
                <th className='px-4 py-2 border-b border-[#e5e7eb] text-start'>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction: Order) => (
                <React.Fragment key={transaction.id}>
                  {transaction.orderItems.map((orderItem, itemIndex) => (
                    <tr key={`${transaction.id}-${itemIndex}`}>
                      <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>#{(transaction.id).slice(0, 3)}</td>
                      <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>{transaction.user?.firstName} {transaction.user?.lastName}</td>
                      <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>{orderItem.products.name}</td>
                      <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>
                        {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                        })}
                      </td>
                      <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[transaction.status]}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className='px-4 py-2 border-b border-[#e5e7eb] font-light'>{orderItem.price.toFixed(1)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>{`${searchedTransactions.length} out of ${orders.length} orders`}</div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;