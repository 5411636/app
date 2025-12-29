import { createBrowserRouter } from "react-router-dom";
import  List  from "../views/list"
import Login from "../views/login"
const router = createBrowserRouter([
    {
        path: "/",
        element: <List />,
    },
    {
        path: "/login",
        element: <Login />,
    }
])
export default router;