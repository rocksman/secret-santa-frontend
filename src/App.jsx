import { app } from './config/firebase';
import 'flowbite';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import Address from './pages/address';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import { store } from './redux/store';
import ProtectedRoute from './util/protected-route';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/address",
      element: <ProtectedRoute element={<Address />} />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute element={<Dashboard />} />,
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
