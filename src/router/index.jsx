import { createBrowserRouter, redirect } from "react-router-dom";
import  List  from "../views/list"
const router = createBrowserRouter([
    {
        path: "/",
        element: <List />,
    },
    // {
    //     path: "/list",
    //     element: <List />,
    //     //路由守卫
    //     loader: async () => {
    //         const token = JSON.parse(localStorage.getItem("token"))
    //         if (token) {
    //             return null
    //         }else{
    //             return redirect("/")
    //         }
    //     }
    // }
])



export default router;