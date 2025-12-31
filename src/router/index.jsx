import { createBrowserRouter } from "react-router-dom";
import  List  from "../views/list"
import Add from "../views/add"
import Edit from "../views/edit"
const router = createBrowserRouter([
    {
        path: "/",
        element: <List />,
    },
    {
        path: "/add",
        element: <Add />,
    },
    {
        path: "/edit",
        element: <Edit />,
    }
])
export default router;