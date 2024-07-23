import  { useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveMenu } from "../../redux/slices/buyerDashboard";
import DateFormatter from "../../utils/DateFormater";

function PendingPayments({orderss}:any) {
  const dispatch = useDispatch();
  const {data} = orderss
  const orders = data.filter((order:any) => order.status === "pending");


  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Pending Payments</h1>
      <div className="space-y-4">
      {currentOrders.length === 0 ? (
          <div className="text-3xl h-64 flex justify-center items-center">
           No orders found.
        </div>
        ):(
        currentOrders.map((order:any) => (
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
                <p className="font-semibold">{order.totalPrice}</p>
              </div>
              <button 
                className="bg-darkGreen text-whiteColor px-4 py-2 rounded-md shadow-md hover:bg-greenColor transition duration-200"
                onClick={() => dispatch(setActiveMenu({ activeMenu: "order-details", id: order.id }))}
              >
                Details
              </button>
            </div>
          </div>
        )))}
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

export default PendingPayments;
