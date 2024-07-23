import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserByIdQuery } from '../services/userApi';
import { setAllOrders, setIsOrdersFetched } from '../redux/slices/orderSlice';
import { setFetchedUser } from '../redux/slices/userSlice';
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import NotFoundPage from "./NotFoundPage";
import Account from "../containers/buyer/Account";
import ResetPassword from "../containers/buyer/ResetPassword";
import Orders from "../containers/buyer/Orders";
import PendingPayments from "../containers/buyer/PendingPayments";
import FeedBack from "../containers/buyer/FeedBack";
import InTransit from "../containers/buyer/InTransit";
import ReturnRefund from "../containers/buyer/ReturnRefund";
import Profile from "../containers/buyer/Profile";
import OrderDetails from "../containers/buyer/OderDetails";
import WishList from "../containers/buyer/WishList";
import { setActiveMenu } from "../redux/slices/buyerDashboard";
import LoadingComponent from '../containers/buyer/Loading';
import { useGetOrdersQuery } from '../services/orderApi';


function BuyerProfile() {
  const activeMenu = useSelector((state: any) => state.activeMenu.activeMenu);
  const dispatch = useDispatch();
  
  const userInfo = useSelector((state: any) => state.user.userInfo) || {
    firstName: 'Anonymous',
    lastName: 'Anonymous',
    photoUrl: '',
    email: 'anonymous',
    Role: 'Guest'
  };
  
  const user = useSelector((state: any) => state.user);
  const userId = user.userId ? user.userId.replace(/"/g, '') : '';

  const { isLoading: isFetchingUser, isSuccess: isUserFetched, isError: isUserError, error: userError, data: userData } = useGetUserByIdQuery(userId);
  const { allOrders }: any = useSelector((state: any) => state.orders);
  const { isLoading: isFetchingOrders, isError: isOrdersError, error: ordersError, data: orders } = useGetOrdersQuery();

  useEffect(() => {
    if (isUserFetched && userData?.message) {
      const { id,firstName, lastName, photoUrl, email, Role } = userData.message;
      dispatch(setFetchedUser({ id,firstName, lastName, photoUrl, email, Role, phoneNumber: '' }));
    } else {
      dispatch(setFetchedUser({
        id: 'Anonymous',
        firstName: 'Anonymous',
        lastName: 'Anonymous',
        phoneNumber: '',
        email: 'anonymous',
        Role: 'Guest'
      }));
    }
  }, [isUserFetched, userData, dispatch]);

  useEffect(() => {
    if (!isFetchingOrders && orders) {
      dispatch(setAllOrders(orders));
      dispatch(setIsOrdersFetched(true));
    }
  }, [orders, dispatch, isFetchingOrders]);

  useEffect(() => {
    const navigateTo = sessionStorage.getItem('navigateTo');
    if (navigateTo === 'orders') {
      dispatch(setActiveMenu({ activeMenu: 'orders' }));
      sessionStorage.removeItem('navigateTo');
    }
  }, [dispatch]);

  if (isOrdersError || ordersError || isUserError || userError) {
    return <NotFoundPage />;
  }

  if (isFetchingUser || isFetchingOrders) {
    return <LoadingComponent isFetchingUser={isFetchingUser} isFetchingOrders={isFetchingOrders} />;
  }

  if (!isUserFetched || userData?.message.Role.name !== 'buyer') {
    return <div className="text-center text-lg font-semibold"><NotFoundPage /></div>;
  }

  const ordersToDisplay = allOrders.length ? allOrders.data : orders;

  const renderContent = () => {
    switch (activeMenu) {
      case "account":
        return <Account firstName={userInfo.firstName} lastName={userInfo.lastName} photoUrl={userInfo.photoUrl} orderss={ordersToDisplay} Role={userInfo.Role} data={[]} />;
      case "orders":
        return <Orders orderss={ordersToDisplay} />;
      case "wish":
        return <WishList />;
      case "pendingpayments":
        return <PendingPayments orderss={ordersToDisplay} />;
      case "returnrefund":
        return <ReturnRefund />;
      case "feedback":
        return <FeedBack />;
      case "intransit":
        return <InTransit orderss={ordersToDisplay} />;
      case "reset":
        return <ResetPassword />;
      case "profile":
        return <Profile />;
      case "order-details":
        return <OrderDetails orderss={ordersToDisplay} />;
      default:
        return <div>Invalid Selection</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 xl:grid-cols-5 min-h-screen xl:px-32">
        <div className="xl:bg-whiteColor p-4 sticky top-16 xl:col-span-1 xl:z-0 z-20 bg-grayColor">
          <div className="bg-greenColor py-10 mb-10 flex justify-center rounded-md items-center text-whiteColor">
            Buyer Dashboard
          </div>
          <ul>
            <li
              className={`py-2 rounded-md pl-5 cursor-pointer ${activeMenu === "account" ? "bg-greenColor text-whiteColor" : ""}`}
              onClick={() => dispatch(setActiveMenu({ activeMenu: "account" }))}
            >
              My Account
            </li>
            <li
              className={`py-2 pl-5 rounded-md cursor-pointer ${activeMenu === "orders" ? "bg-greenColor text-whiteColor" : ""}`}
              onClick={() => dispatch(setActiveMenu({ activeMenu: "orders" }))}
            >
              My Orders
            </li>
            <li
              className={`py-2 pl-5 rounded-md cursor-pointer ${activeMenu === "wish" ? "bg-greenColor text-whiteColor" : ""}`}
              onClick={() => dispatch(setActiveMenu({ activeMenu: "wish" }))}
            >
              Wish List
            </li>
            <li
              className={`py-2 pl-5 rounded-md cursor-pointer ${activeMenu === "reset" ? "bg-greenColor text-whiteColor" : ""}`}
              onClick={() => dispatch(setActiveMenu({ activeMenu: "reset" }))}
            >
              Reset Password
            </li>
          </ul>
        </div>
        <div className="col-span-4 p-4 z-0">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BuyerProfile;
