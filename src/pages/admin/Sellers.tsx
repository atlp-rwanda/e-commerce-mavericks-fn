// src/pages/admin/Sellers.tsx
import React, { useState, useEffect } from 'react';
import Table from '../../components/dashboard/VendorsTable';
import { BiLoader } from 'react-icons/bi';
import { useGetRolesQuery } from '../../services/roleApi';
import { useGetSellersQuery, useUpdateUserRoleMutation } from '../../services/userApi';
import ConfirmDisableModal from '../../components/dashboard/ConfirmDisableModal';
import { User as Seller } from '../../types/Types';

const Sellers: React.FC = () => {
  const {
    data: sellersData,
    isLoading: sellersLoading,
    isError: sellersError,
    refetch: refetchSellers,
  } = useGetSellersQuery(undefined, {
    pollingInterval: 30000,
  });
  const { data: rolesData, isLoading: rolesLoading, isError: rolesError } = useGetRolesQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

  const loading = sellersLoading || rolesLoading;
  const error = sellersError || rolesError;

  const sellers = sellersData?.message || [];
  const roles = rolesData?.data || [];

  useEffect(() => {
    refetchSellers();
  }, [refetchSellers]);

  const handleOpenModal = (seller: Seller) => {
    setSelectedSeller(seller);
  };

  const handleCloseModal = () => {
    setSelectedSeller(null);
  };

  const handleDisableSeller = async () => {
    if (selectedSeller) {
      try {
        const buyerRole = roles.find(role => role.name.toLowerCase() === 'buyer');
        if (!buyerRole) {
          console.error('Buyer role not found');
          return;
        }
        await updateUserRole({ userId: selectedSeller.id, roleId: buyerRole.id }).unwrap();
        refetchSellers();
        handleCloseModal();
      } catch (error) {
        console.error('Failed to disable seller:', error);
      }
    }
  };

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
      render: (seller: Seller) => seller.Role.name.toUpperCase(),
      sortable: false,
    },
    {
      key: 'action',
      label: 'Action',
      render: (seller: Seller) => (
        <button
          onClick={() => handleOpenModal(seller)}
          className='px-4 py-2 bg-darkGreen text-whiteColor rounded hover:bg-[#2563EB]'
        >
          Disable
        </button>
      ),
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
      <Table data={sellers} columns={columns} itemsPerPage={10} />
      {selectedSeller && (
        <ConfirmDisableModal
          sellerName={`${selectedSeller.firstName} ${selectedSeller.lastName}`}
          onClose={handleCloseModal}
          onConfirm={handleDisableSeller}
        />
      )}
    </div>
  );
};

export default Sellers;
