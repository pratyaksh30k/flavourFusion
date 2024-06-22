import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Help from "./components/Help";
// import About from "./components/About";
import Profile from "./components/Profile";
import Error from "./components/Error";
// import Contact from "./components/Contact";
import Cart from "./components/Cart";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Shimmer from "./components/Shimmer";
import UsersContext from "./utils/UserContext";
import Store from "./utils/Redux/Store";
import {Provider} from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
//Dynamic import or lazy loading of Instamart
const Instamart = lazy(() => import("./components/Instamart"));
//Dynamic import or lazy loading of Contact
const Contact = lazy(() => import("./components/Contact"));

//Dynamic import or lazy loading of Contact
const About = lazy(() => import("./components/About"));

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
  const [info, setInfo]= useState({
    name:"naman",
    phone:"7879651164",
  });
  return (
    <>
    <ChakraProvider>
    <Provider store={Store}>  
    <UsersContext.Provider value={{user:info}} >
      <Header/>
      <Outlet></Outlet>
      <Footer/>
    </UsersContext.Provider>
    </Provider>
    </ChakraProvider>
    </>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about", // Here we can also write path:"about",
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/contact",
        element: (
          <Suspense>
            <Contact />
          </Suspense>
        ),
      },
      {
        path:"/help",
        element:<Help/>,
      },
      {
        path: "instamart",
        element: (
          <Suspense fallback={<Shimmer/>}>
            <Instamart />
          </Suspense>
        ),
      },
      {
        path:"cart",
        element:<Cart/>
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },
      
    ],  
  },
]);

root.render(<RouterProvider router={appRouter} />);
