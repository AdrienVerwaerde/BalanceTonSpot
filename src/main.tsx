import React from "react";
import ReactDOM from "react-dom/client";

// Import Application components
import App from "./Components/App/App.tsx";
import Homepage from "./Components/HomepageComponents/Homepage/Homepage.tsx";
import LoginForm from "./Components/UserComponents/Login/Login.tsx";
import SignUp from "./Components/UserComponents/SignUp/SignUp.tsx";
import Profile from "./Components/UserComponents/Profile/Profile.tsx";
import Favoris from "./Components/UserComponents/Favoris/Favoris.tsx";
import HeaderUser from "./Components/UserComponents/HeaderUser/HeaderUser.tsx";
import SpotsList from "./Components/SpotsList/SpotsList.tsx";
import Spot from "./Components/Spot/Spot.tsx";
import AboutUs from "./Components/AboutUs/AboutUs.tsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.tsx";
import LegalNotice from "./Components/LegalNotice/LegalNotice.tsx";
import Contact from "./Components/Contact/Contact.tsx";

// Import of the semantic-ui-css library to use the semantic-ui components
import "semantic-ui-css/semantic.min.css";

// Import of react-router-dom components to create our Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./Components/404/404.tsx";

const router = createBrowserRouter([
  // 1. Adding the routes to application pages (Homepage, SpotsList, SpotDetails, etc.)
  {
    path: "/",
    element: <App />,
    // setting of children road of the principal road
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "spotslist",
        element: <SpotsList />,
      },
      {
        path: "spot/:name",
        element: <Spot />,
      },
      {
        path: "legal-notice",
        element: <LegalNotice />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "our-team",
        element: <AboutUs />,
      },
    ],
  },
  // 2. Adding routes on login, signup
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  // 3. Adding routes on user page
  {
    path: "/",
    element: <HeaderUser />,
    // setting of children road of the principal road
    children: [
      {
        path: "profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      {
        path: "favoris",
        element: <PrivateRoute><Favoris /></PrivateRoute>,
      },
    ],
  },

  //Adding route for 404 page
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

// X. Rending of the Router
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      {/* ici on ne veut plus rendre simplement le composant App, mais notre router qui contient la logique de routage => c'est lui qui va décider en fonction de l'URL, quel composant rendre */}
      <RouterProvider router={router} />
  </React.StrictMode>
);
