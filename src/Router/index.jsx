import { useRoutes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import Home from "../Pages/Home";
import TermsConditions from "../Pages/TermsConditions";
import FormInscription from "../Pages/FormInscription";
import Profile from "../Pages/Profile";
import Menu from "../Pages/Menu";
import EditProfile from "../Pages/EditProfile";
import Vites from "../Pages/Vites";
import Informaicion from "../Pages/Informaicion";
import DatePlantation from "../Pages/DatePlantation";


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
    },
    {
      path: '/inscription',
      element:<FormInscription/>
    },
    {
      path:'/menu',
      element:<Menu/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/editPerfil',
      element:<EditProfile/>
    },
    {
      path:'/vites',
      element:<Vites/>
    },
    {
      path:'/informacion',
      element: <Informaicion/>
    },
    {
      path:'informacion/vite/:id',
      element: <DatePlantation/>
    }
    
  ]);
}

export default Router;
