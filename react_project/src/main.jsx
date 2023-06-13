import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import PageNotFoundComponent from "./components/PageNotFound.jsx"
import Layout from "./components/Layout.jsx"
import Table from "./components/Table.jsx"
import Searchbar from "./components/Searchbar.jsx"

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// MAKE the ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/searchbar",
    element: <Searchbar />,
  },
  {
    path: "/layout",
    element: <Layout />,
  },
  {
    path: "/table",
    element: <Table />,
  },
  {
    // IF it didn't match any route then show this instead
    path: "*",
    element: <PageNotFoundComponent/>
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* use the ROUTER istead of a component(let ROUTER handle the components) */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
