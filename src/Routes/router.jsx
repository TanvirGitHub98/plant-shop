import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

import Home from "../pages/Home";
import Plants from "../pages/Plants";
import PlantDetails from "../pages/PlantDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

const RootLayout = () => {
  return (
    <>
      <Navbar />

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

const plantDataLoader = async () => {
  const response = await fetch(
    "/plants.json",
  );

  if (!response.ok) {
    throw new Error(
      "Plant data could not be loaded.",
    );
  }

  return response.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "plants",
        element: <Plants />,
      },
      {
        path: "plant/:id",

        element: (
          <ProtectedRoute>
            <PlantDetails />
          </ProtectedRoute>
        ),

        loader: plantDataLoader,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",

        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;