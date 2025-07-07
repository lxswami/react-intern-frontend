// router.js or routes.js

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login";// Make sure path & case match exactly
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import UsersTable from "./Pages/userTable";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/users",
                element: <UsersTable />,
            },
            {
                path: "/userFullDetail",
                element: <UsersTable />,
            },
        ],
    },
]);
