import React, { useEffect, useState } from 'react';
import buyerProfile from '../../assets/buyer-profile.jpg';
import { MdEdit, MdDelete } from 'react-icons/md';

const BuyersPage = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Get the token from local storage or wherever you store it
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await fetch(
          'https://e-commerce-mavericcks-bn-staging-istf.onrender.com/api/users/role/buyer',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch buyers');
        }

        const data = await response.json();
        setBuyers(data.message);
      } catch (err) {
        setError('Failed to fetch buyers');
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, [token]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter buyers based on search query
  const filteredBuyers = buyers.filter(buyer =>
    `${buyer.firstName} ${buyer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='md:ml-64'>
      <div className='text-right mx-6 mt-5 flex justify-between'>
        <div className='flex items-center rounded bg-whiteColor p-2'>
          <input
            type='text'
            placeholder='Search buyer'
            className='border-none outline-none'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className='shadow-md rounded-lg bg-[#F9F9F9] p-5 m-6 overflow-auto'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr>
                <th className='pb-5 px-4'>Name</th>
                <th className='pb-5 px-4'>Contact</th>
                <th className='pb-5 px-4'>Number of orders</th>
                <th className='pb-5 px-4'>Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuyers.map((buyer, index) => (
                <tr key={buyer.id} className={`${index % 2 === 0 ? 'bg-[#D9D9D9]' : ''}`}>
                  <td className='py-2 px-4 flex items-center'>
                    <img className='w-10 h-10 rounded-full' src={buyer.photoUrl || buyerProfile} alt='Profile' />
                    <span className='ml-3'>{`${buyer.firstName} ${buyer.lastName}`}</span>
                  </td>
                  <td className='py-2 px-4'>{buyer.phoneNumber}</td>
                  <td className='py-2 px-4'>{buyer.ordersCount || 0}</td>
                  <td className='py-2 px-4 flex items-center'>
                    <button className='mr-2'>
                      <MdEdit size={20} className='hover:text-darkGreen' />
                    </button>
                    <button>
                      <MdDelete size={20} className='hover:text-[#c75151]' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Buyers = () => {
  return (
    <div>
      <BuyersPage toggleSidebar={() => {}} />
    </div>
  );
};

export default Buyers;
