import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";

const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: "login/",
            element: <Login />
        },
        {
            path: "signup/",
            element: <Signup />
        }
    ]
}]);

export default router;