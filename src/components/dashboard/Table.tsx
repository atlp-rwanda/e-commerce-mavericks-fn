import TableRow from './TableRow';

interface TableProps {
  data: {
    referenceNumber: string;
    customer: string;
    product: string;
    date: string;
    status: string;
    price: string;
  }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200'>
        <thead>
          <tr>
            <th className='px-4 py-2 border-b'>Reference Number</th>
            <th className='px-4 py-2 border-b'>Customer</th>
            <th className='px-4 py-2 border-b'>Product</th>
            <th className='px-4 py-2 border-b'>Date</th>
            <th className='px-4 py-2 border-b'>Status</th>
            <th className='px-4 py-2 border-b'>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
