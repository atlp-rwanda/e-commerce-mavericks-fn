import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SamplePage from './pages/SamplePage';
import Login from './pages/Login';
import Counter from './components/Counter';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SamplePage />,
    },
    {
      path: 'login',
      element: <Login />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />

      <h2>redux</h2>
      <Counter />
    </div>
  );
};

export default App;
