import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../components/App';
import Characters from '../pages/Characters';
import Films from '../pages/Films';
import Planets from '../pages/Planets';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <div>Err</div>,
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to='/planets' />,
      },
      {
        path: 'planets',
        errorElement: <div>Err</div>,
        element: <Planets />,
      },
      {
        path: 'characters',
        errorElement: <div>Err</div>,
        element: <Characters />,
      },
      {
        path: 'films',
        errorElement: <div>Err</div>,
        element: <Films />,
      },
    ],
  },
]);
