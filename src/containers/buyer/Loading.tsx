import { BiLoader } from 'react-icons/bi';

const LoadingComponent = ({ isFetchingUser, isFetchingOrders }: { isFetchingUser: boolean, isFetchingOrders: boolean }) => {
  if (isFetchingUser || isFetchingOrders) {
    return (
      <div className="fixed inset-0 bg-whiteColor bg-opacity-50 flex items-center justify-center z-50">
        <BiLoader className="animate-spin text-white text-4xl" />
      </div>
    );
  }

  return null;
};

export default LoadingComponent;
