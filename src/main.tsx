import React from 'react'
import ReactDOM from 'react-dom/client'

// Import Application components
import App from './Components/App/App.tsx'
import Homepage from './Components/HomepageComponents/Homepage/Homepage.tsx';
import LoginForm from './Components/UserComponents/Login/Login.tsx';
import SignUp from './Components/UserComponents/SignUp/SignUp.tsx';
import Profile from './Components/UserComponents/Profile/Profile.tsx';
import Admin from './Components/AdminComponents/Admin.tsx'
import Favoris from './Components/UserComponents/Favoris/Favoris.tsx'

// Import of the semantic-ui-css library to use the semantic-ui components
import 'semantic-ui-css/semantic.min.css'

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
        path: 'spotslist',
        //element: <SpotsList />,
      },
    ],
  },
// 2. Adding routes on login, signup, and profile pages
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/favoris',
    element: <Favoris spots={undefined} />,
  },

// 4. Adding routes on admin page
  {
    path: '/admin',
    element: <Admin />,
  }
]);

// X. Rending of the Router
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* ici on ne veut plus rendre simplement le composant App, mais notre router qui contient la logique de routage => c'est lui qui va décider en fonction de l'URL, quel composant rendre */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
