import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../components/App';
import Characters from '../pages/Characters';
import Films from '../pages/Films';
import Planets from '../pages/Planets';
import NoResult from '../components/NoResult';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NoResult text={'Nothing Found'} goBack={() => { }} errorFromRouter={'/'} />,
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to='/planets' />,
      },
      {
        path: 'planets',
        element: <Planets />,
      },
      {
        path: 'characters',
        element: <Characters />,
      },
      {
        path: 'films',
        element: <Films />,
      },
    ],
  },
]);
