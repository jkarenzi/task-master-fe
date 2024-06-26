import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Home from '../pages/Home';

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Routes;
