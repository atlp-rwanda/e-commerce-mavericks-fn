import React, { useEffect } from 'react';
import Table from '../../components/dashboard/BuyersTable';
import { BiLoader } from 'react-icons/bi';
import { useGetBuyersQuery } from '../../services/userApi';
import { User as Buyer } from '../../types/Types';

const Buyers: React.FC = () => {
  const {
    data: buyersData,
    isLoading: buyersLoading,
    isError: buyersError,
    refetch: refetchBuyers,
  } = useGetBuyersQuery(undefined, {
    pollingInterval: 30000,
  });

  const loading = buyersLoading;
  const error = buyersError;

  const buyers = buyersData?.message || [];

  useEffect(() => {
    refetchBuyers();
  }, [refetchBuyers]);

  const columns = [
    { key: 'photoUrl', label: 'Photo', isImage: true, sortable: false },
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phoneNumber', label: 'Phone', sortable: true },
    { key: 'gender', label: 'Gender', sortable: true },
    {
      key: 'Role.name',
      label: 'Role',
      render: (buyer: Buyer) => buyer.Role.name.toUpperCase(),
      sortable: false,
    },
  ];

  if (loading)
    return (
      <div className='text-center content-center h-screen py-4'>
        <BiLoader className='animate-spin w-full h-full max-h-12 text-[#3B82F6]' />
      </div>
    );
  if (error) {
    return <div className='text-center py-4 text-redColor'>Error fetching data. Please try again.</div>;
  }

  return (
    <div className='container mx-auto p-4 lg:pl-56'>
      <Table data={buyers} columns={columns} itemsPerPage={10} />
    </div>
  );
};

export default Buyers;