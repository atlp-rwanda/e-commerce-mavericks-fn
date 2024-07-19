// src/pages/admin/UserManagement.tsx
import React, { useState, useEffect } from 'react';
import Table from '../../components/dashboard/UsersTable';
import { BiLoader } from 'react-icons/bi';
import { useGetRolesQuery } from '../../services/roleApi';
import { useGetUsersQuery, useUpdateUserRoleMutation } from '../../services/userApi';
import RoleChangeModal from '../../components/dashboard/RoleChangeModal';
import { User } from '../../types/Types';

const UserManagement: React.FC = () => {
  const { data: usersData, isLoading: usersLoading, isError: usersError } = useGetUsersQuery();
  const { data: rolesData, isLoading: rolesLoading, isError: rolesError } = useGetRolesQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (usersData?.message) {
      setUsers(usersData.message);
    }
  }, [usersData]);

  const loading = usersLoading || rolesLoading;
  const error = usersError || rolesError;

  const roles = rolesData?.data || [];

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleRoleChange = async (newRoleId: string) => {
    if (selectedUser) {
      try {
        await updateUserRole({ userId: selectedUser.id, roleId: newRoleId }).unwrap();
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === selectedUser.id
              ? {
                  ...user,
                  Role: { ...user.Role, id: newRoleId, name: roles.find(r => r.id === newRoleId)?.name || '' },
                }
              : user
          )
        );
        handleCloseModal();
      } catch (error) {
        console.error('Failed to update user role:', error);
      }
    }
  };

  const columns = [
    { key: 'photoUrl', label: 'Photo', isImage: true },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'gender', label: 'Gender' },
    {
      key: 'role',
      label: 'Role',
      render: (user: User) => user.Role.name.toUpperCase(),
    },
    {
      key: 'action',
      label: 'Action',
      render: (user: User) => (
        <button
          onClick={() => handleOpenModal(user)}
          className='px-2 py-1 bg-[#3B82F6] text-whiteColor rounded hover:bg-[#2563EB]'
        >
          Change Role
        </button>
      ),
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
      <Table data={users} columns={columns} itemsPerPage={10} />
      <RoleChangeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleRoleChange}
        user={selectedUser}
        roles={roles}
      />
    </div>
  );
};

export default UserManagement;
