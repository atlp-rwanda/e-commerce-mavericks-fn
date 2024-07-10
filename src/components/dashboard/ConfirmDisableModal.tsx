import React from 'react';

interface ConfirmDisableModalProps {
  sellerName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDisableModal: React.FC<ConfirmDisableModalProps> = ({ sellerName, onClose, onConfirm }) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 bg-[black] bg-opacity-50 overflow-y-auto flex justify-center items-center'
      onClick={handleBackgroundClick}
    >
      <div className='bg-whiteColor p-5 rounded-lg shadow-lg w-96'>
        <h2 className='text-xl font-bold mb-4'>Confirm Disable</h2>
        <p className='mb-4'>
          Are you sure you want to disable the seller account for <b>{sellerName}</b>? <br />
          <br />
          This action will change their role to buyer.
        </p>
        <div className='flex justify-end'>
          <button onClick={onClose} className='mr-2 px-4 py-2 bg-grayColor rounded'>
            Cancel
          </button>
          <button onClick={onConfirm} className='px-4 py-2 bg-overlay text-whiteColor rounded'>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDisableModal;