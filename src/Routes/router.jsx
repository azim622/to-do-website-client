import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import MainLayOuts from "../LayOut/MainLayOuts";
import Home from "../Home/Home";
import PrivateRoute from "../PrivetRoute/PrivetRoute";
import Dashboard from "../Dashboard/Dashboard";
import Error from "../Error/Error";


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
                    <PrivateRoute>
                        <Dashboard></Dashboard>
                    </PrivateRoute>
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
    {
        path: "*",
        element: <Error></Error>,
    },
    
]);

export default router;