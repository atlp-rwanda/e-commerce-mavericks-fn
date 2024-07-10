import React, { useState } from 'react';

interface Role {
  id: string;
  name: string;
}

interface RoleChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (roleId: string) => void;
  user: any;
  roles: Role[];
}

const RoleChangeModal: React.FC<RoleChangeModalProps> = ({ isOpen, onClose, onConfirm, user, roles }) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');

  if (!isOpen || !user) return null;

  const handleConfirm = () => {
    if (selectedRoleId) {
      onConfirm(selectedRoleId);
    }
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-blackColor bg-opacity-50 z-50 flex items-center justify-center'>
      <div className='bg-whiteColor p-6 rounded-lg'>
        <h2 className='text-xl font-bold mb-4'>
          Change Role for{' '}
          <span className='p-1.5 text-xs font-[800] uppercase tracking-wider text-[#166534] bg-[#BBF7D0] rounded-lg bg-opacity-50'>
            {user.firstName} {user.lastName}
          </span>
        </h2>
        <p>Current Role: {user.Role.name}</p>
        <div className='mt-4'>
          <label className='block mb-2'>New Role:</label>
          <select
            className='w-full p-2 border rounded'
            onChange={e => setSelectedRoleId(e.target.value)}
            value={selectedRoleId || user.Role.id}
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-6 flex justify-end'>
          <button onClick={onClose} className='px-4 py-2 bg-[#D1D5DB] rounded mr-2 hover:bg-[#9CA3AF]'>
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className='px-4 py-2 bg-[#3B82F6] text-whiteColor rounded hover:bg-[#2563EB]'
            disabled={!selectedRoleId || selectedRoleId === user.Role.id}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleChangeModal;
