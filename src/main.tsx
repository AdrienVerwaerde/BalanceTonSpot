import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App/App.tsx'
import 'semantic-ui-css/semantic.min.css'
import Homepage from './Components/Homepage/Homepage.tsx';
import LoginForm from './Components/UserComponents/Login/Login.tsx';
import SignUp from './Components/UserComponents/SignUp/SignUp.tsx';

// Import of react-router-dom components to create our Router
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  createRoutesFromElements,
  Route,
  NavLink,
  Outlet,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";


const router = createBrowserRouter([
// 1. Adding the routes to application pages (Homepage, SpotsList, SpotDetails, etc.)
  {
    path: '/',
    element: <App />,
    // setting of children road of the principal road
    children: [
      {
        path: '',
        element: <Homepage />,
      },
      {
        path: 'SpotsList',
        //element: <SpotsList />,
      },
    ],
  },
// 2. Adding routes on login, signup and profile pages
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/SignUp',
    element: <SignUp />,
  },
  {
    path: '/profile',
    //element: <Profile />,
  },
]);

// 3. Rending of the Router
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* ici on ne veut plus rendre simplement le composant App, mais notre router qui contient la logique de routage => c'est lui qui va décider en fonction de l'URL, quel composant rendre */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
