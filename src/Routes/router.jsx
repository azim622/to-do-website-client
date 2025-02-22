import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import MainLayOuts from "../LayOut/MainLayOuts";
import Home from "../Home/Home";
import PrivateRoute from "../PrivetRoute/PrivetRoute";
import Dashboard from "../Dashboard/Dashboard";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOuts></MainLayOuts>,
        children: [
            {
                path: "",
                element: <Home></Home>
            },
            {
                path: "/dashboard",
                element: (
                        <Dashboard></Dashboard>
                ),
            },
            
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element:<Registration></Registration>
            },
        ],
    },
    
]);

export default router;