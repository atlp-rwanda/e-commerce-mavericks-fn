import OrderTable from '../../components/OrderTables';
import Navbar from '../../components/dashboard/Navbar';

      

export default function Orders() {

  return (
    <>
      <div>
      <Navbar location='Orders' page='seller/orders' />
        <OrderTable/>
      </div>
    </>
  );
}
  
