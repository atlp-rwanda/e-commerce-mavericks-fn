import { FaRegListAlt, FaUserFriends, FaUserTie, FaRegEnvelope, FaCog } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import logo from '../../assets/Rectangle 2487.png';
import { Link, NavLink, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../../redux/slices/userSlice';

export default function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUserData());
    <Navigate to='/' />;
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-blackColor opacity-50 z-40 ${isOpen ? 'block' : 'hidden'} md:hidden`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`w-64 h-screen bg-whiteColor shadow-md flex flex-col justify-between fixed z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className='p-6'>
          <div className='text-center font-semibold text-2xl mb-6 static'>
            <Link to='/'>
              MAVERICKS <img src={logo} alt='' className='absolute top-5 right-5' width={40} height={40} />
            </Link>
          </div>
          <nav>
            <ul className='space-y-2'>
              <li>
                <NavLink
                  to='/admin'
                  end
                  className={({ isActive }) =>
                    `flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#E5E7EB] text-[#8F8183] ${
                      isActive ? 'bg-skyBlue text-skyBlueText hover:bg-skyBlue' : ''
                    }`
                  }
                >
                  <RxDashboard className='mr-3' />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/admin/categories'
                  className={({ isActive }) =>
                    `flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#E5E7EB] text-[#8F8183] ${
                      isActive ? 'bg-skyBlue text-skyBlueText hover:bg-skyBlue' : ''
                    }`
                  }
                >
                  <FaRegListAlt className='mr-3' />
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/admin/sellers'}
                  className={({ isActive }) =>
                    `flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#E5E7EB] text-[#8F8183] ${
                      isActive ? 'bg-skyBlue text-skyBlueText hover:bg-skyBlue' : ''
                    }`
                  }
                >
                  <FaUserTie className='mr-3' />
                  Sellers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/admin/buyers'}
                  className={({ isActive }) =>
                    `flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#E5E7EB] ${
                      isActive ? 'bg-skyBlue text-skyBlueText hover:bg-skyBlue' : 'text-[#8F8183]'
                    }`
                  }
                >
                  <FaUserFriends className='mr-3' />
                  Buyers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/admin/messages'}
                  className={({ isActive }) =>
                    `flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#E5E7EB] ${
                      isActive ? 'bg-skyBlue text-skyBlueText hover:bg-skyBlue' : 'text-[#8F8183]'
                    }`
                  }
                >
                  <FaRegEnvelope className='mr-3' />
                  Messages
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/admin/settings'}
                  className={({ isActive }) =>
                    `flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#E5E7EB] text-[#8F8183] ${
                      isActive ? 'bg-skyBlue text-skyBlueText hover:bg-skyBlue' : ''
                    }`
                  }
                >
                  <FaCog className='mr-3' />
                  Settings
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className='p-6 block'>
          <a
            onClick={handleLogout}
            className='flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#E5E7EB] cursor-pointer'
          >
            <FiLogOut className='mr-3' />
            Logout
          </a>
        </div>
      </div>
    </>
  );
}
