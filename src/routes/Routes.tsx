import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import TwoFactorAuth from '../pages/auth/TwoFactorAuth';
import EmailVerification from '../pages/auth/EmailVerification';
import Email from '../pages/auth/Email';
import StickyPage from '../pages/StickyPage';
import Settings from '../pages/Settings';
import { useAppSelector } from '../redux/hooks';

const Routes = () => {
  const token = useAppSelector(state => state.user.token)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
        <Route path='/auth'>
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<Signup/>}/>
            <Route path='2fa' element={<TwoFactorAuth/>}/>
            <Route path='verify/:token' element={<EmailVerification/>}/>
            <Route path='email' element={<Email/>}/>
        </Route>
        <Route path='notes' element={token?<StickyPage/>:<Navigate to='/auth/login'/>}/>
        <Route path='settings' element={token?<Settings/>:<Navigate to='/auth/login'/>}/>
      </Route>
    )
  );

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </div>
  );
};

export default Routes;
