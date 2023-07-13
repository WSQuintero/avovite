import { useRoutes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import Home from "../Pages/Home";
import TermsConditions from "../Pages/TermsConditions";


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
    {
      path:"/termsandConditions",
      element: <TermsConditions/>
    }
    
  ]);
}

export default Router;
