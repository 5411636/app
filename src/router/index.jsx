import { createBrowserRouter, redirect } from "react-router-dom";

import  List  from "../views/list"
import Login from "../views/login";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/list",
        element: <List />,
        //路由守卫
        loader: async () => {
            const token = JSON.parse(localStorage.getItem("token"))
            if (token) {
                return null
            }else{
                return redirect("/")
            }
        }
    }
])



export default router;