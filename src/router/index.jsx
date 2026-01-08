import { createBrowserRouter, redirect } from "react-router-dom";
import  List  from "../views/list"
import Searc from "../views/search"
const router = createBrowserRouter([
    {
        path: "/",
        element: <List />,
    },
    {
        path: "/search",
        element: <Searc />,
    }
])



export default router;