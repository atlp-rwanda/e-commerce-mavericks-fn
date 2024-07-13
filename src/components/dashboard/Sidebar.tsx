import { FiLogOut } from 'react-icons/fi';
import logo from '../../assets/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setIsOpen } from '../../redux/slices/sidebarSlice';

interface IsidebarLinks {
  name: string;
  path: string;
  icon: JSX.Element;
}

export default function Sidebar({ sidebarLinks }: { sidebarLinks: IsidebarLinks[] }) {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const navigateTo = useNavigate();

  const toggleSidebar = () => {
    dispatch(setIsOpen());
  };

  const handleLogout = () => {
    dispatch(clearUserData());
    navigateTo('/');
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
              {sidebarLinks.map((link, index) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    end={index === 0}
                    className={({ isActive }) =>
                      `flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-[#E5E7EB] text-[#8F8183] ${
                        isActive ? 'bg-skyBlue text-skyBlueText hover:bg-skyBlue' : ''
                      }`
                    }
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                </li>
              ))}
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
