import { useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveMenu } from "../../redux/slices/buyerDashboard";
import DateFormatter from "../../utils/DateFormater";

function Orders({orderss}:any) {
  const dispatch = useDispatch();
  const {data} = orderss

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");

  const ordersPerPage = 3;

  const handleFilterChange = (e:any) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const filteredOrders = data.filter((order:any) => {
    if (filter === "All") return true;
    if (filter === "Pending Payments") return order.status === "pending";
    if (filter === "cancelled") return order.status === "cancelled";
    if (filter === "delivered") return order.status === "delivered";
    if (filter === "paid") return order.status === "paid";


    if (filter === "In Transit") return order.status === "paid" || order.status === "processing";
    return true;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="filter mb-4">
        <select onChange={handleFilterChange} className="p-2 border border-grayColor rounded-md">
          <option value="All">All</option>
          <option value="Pending Payments">Pending Payments</option>
          <option value="cancelled">Cancelled</option>
          <option value="paid">Paid</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <div className="space-y-4">
        {currentOrders.map((order:any) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="order-header flex justify-between items-center border-b pb-2 mb-2">
              <div className="flex gap-4">
                <p className="text-gray-600 font-medium">Id:</p>
                <p className="font-semibold">{order.id}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-gray-600 font-medium">Status:</p>
                <p>{order.status}</p>
              </div>
            </div>
            <div className="order-body flex justify-between items-center">
              <p className="text-gray-600"><DateFormatter date={order.updatedAt}/></p>
              <div className="flex gap-2 items-center">
                <p className="text-gray-600 font-medium">Total Price:</p>
                <p className="">${order.totalPrice}</p>
              </div>
              <button 
                className="bg-darkGreen text-whiteColor px-4 py-2 rounded-md shadow-md hover:bg-greenColor transition duration-200"
                onClick={() => dispatch(setActiveMenu({ activeMenu: "order-details", id: order.id }))}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={`mx-1 px-3 py-1 border rounded ${
            currentPage === index + 1 ? "bg-greenColor text-whiteColor" : "bg-whiteColor border-grayColor"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Orders;
