// components/menu/Account.tsx
import { FaUserEdit, FaHourglassHalf } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { MdOutlineFeedback } from "react-icons/md";
import { PiKeyReturn } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setActiveMenu } from "../../redux/slices/buyerDashboard";

interface AccountProps {
  lastName: string;
  photoUrl: string;
  firstName: string;
  email?: string;
  orderss: any[];
  data: any[];
  Role: any
}

const image: string = 'https://images.unsplash.com/photo-1533636721434-0e2d61030955?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const Account: React.FC<AccountProps> = ({ firstName, Role, lastName, photoUrl, orderss }) => {
  const dispatch = useDispatch();
  const {data}:any = orderss

  return (
    <div className="p-6">
      {/* User Profile Section */}
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
        <div className="flex items-center">
          <img src={photoUrl ? photoUrl : image} alt="profile" className="rounded-full mr-4 w-16 h-16 object-cover" />
          <div>
            <h2 className="text-xl font-semibold">{lastName} {firstName}</h2>
            <p className="text-gray-600">{Role? Role.name: 'buyer'} </p>
          </div>
        </div>
        <FaUserEdit className="text-2xl text-gray-600 cursor-pointer" onClick={() => dispatch(setActiveMenu({ activeMenu: "profile" }))} />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
        {/* Pending Card */}
        <div className="bg-whiteColor cursor-pointer shadow-md p-8 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105 relative"
          onClick={() => dispatch(setActiveMenu({ activeMenu: "pendingpayments" }))}>
          <div className="absolute top-2 right-2 bg-redColor text-whiteColor text-sm rounded-full w-8 h-8 flex items-center justify-center">
            {data.filter((order: { status: string; }) => order.status === 'pending').length}
          </div>
          <FaHourglassHalf className="text-6xl text-greenColor mb-4 w-full text-center" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">Pending Payments</h3>
          </div>
        </div>

        {/* In Transit Card */}
        <div className="bg-whiteColor cursor-pointer shadow-md p-8 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105 relative"
          onClick={() => dispatch(setActiveMenu({ activeMenu: "intransit" }))}>
          <div className="absolute top-2 right-2 bg-redColor text-whiteColor text-sm rounded-full w-8 h-8 flex items-center justify-center">
          {data.filter((order: { status: string; }) => order.status === 'in-transit').length} 
         </div>
          <FaTruckFast className="text-6xl text-greenColor mb-4 w-full text-center" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">In Transit</h3>
          </div>
        </div>

        {/* Feedback Card */}
        <div className="bg-whiteColor cursor-pointer shadow-md p-8 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105 relative"
          >
          <MdOutlineFeedback className="text-6xl text-greenColor mb-4 w-full text-center" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">Feedback</h3>
          </div>
        </div>

        {/* Refund & Return Card */}
        <div className="bg-whiteColor cursor-pointer shadow-md p-8 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105 relative"
          >
          <PiKeyReturn className="text-6xl text-greenColor mb-4 w-full text-center" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">Return & Refund</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
