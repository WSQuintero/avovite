import { useRoutes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import Welcome from "../Pages/Welcome";


function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Welcome />,
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
