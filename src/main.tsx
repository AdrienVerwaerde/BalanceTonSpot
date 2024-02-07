import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App/App.tsx'
import 'semantic-ui-css/semantic.min.css'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
