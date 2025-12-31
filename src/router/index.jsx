import { createBrowserRouter } from "react-router-dom";
import  List  from "../views/list"

const router = createBrowserRouter([
    {
        path: "/",
        element: <List />,
    }
])
export default router;