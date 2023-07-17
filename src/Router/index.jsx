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
import Cosechas from "../Pages/Cosechas";
import CosechaDetail from "../Pages/CosechaDetail";
import DineroDetail from "../Pages/DineroDetail";
import AnotherDatas from "../Pages/AnotherDatas";
import OtherDataOptions from "../Pages/OtherDataOptions";
import Certificate from "../Pages/Certificate";
import Wallet from "../Pages/Wallet";
import PasarDinero from "../Pages/PasarDinero";
import Products from "../Pages/Products";
import ProductDetail from "../Pages/ProductDetail";
import Checkout from "../Pages/Checkout";


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
      path:'/informacion/vite/:id',
      element: <DatePlantation/>
    },
    {
      path:'/cosechas',
      element:<Cosechas/>
    },
    {
      path:'/cosechaDetail',
      element:<CosechaDetail/>
    },
    {
      path:'/dineroDetail',
      element:<DineroDetail/>
    }, 
    {
      path:'/anotherDatas',
      element:<AnotherDatas/>
    },
    {
      path:'/anotherData/:id',
      element:<OtherDataOptions/>
    },
    {
      path:'/certificados',
      element:<Certificate/>
    },
    {
      path:'/wallet',
      element:<Wallet/>
    },
    {
      path:'/passmoney',
      element:<PasarDinero/>
    },
    {
      path:'/products',
      element:<Products/>
    },
    {
      path:'/productDetail/:id',
      element:<ProductDetail/>
    },
    {
      path:'/checkout',
      element: <Checkout/>
    }
    
  ]);
}

export default Router;
