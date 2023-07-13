import { useRoutes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import Home from "../Pages/Home";


function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path:"/signin",
      element:<Signin/>
    },
   
    {
      path: "/signup",
      element: <Signup />,
    },
    
  ]);
}

export default Router;
