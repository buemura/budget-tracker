import { RouterProvider } from 'react-router-dom';

import { router } from '../helpers/routes';

export default function App() {
  return <RouterProvider router={router} />;
}
