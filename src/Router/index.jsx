import { useMemo } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import useSession from "../Hooks/useSession";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import Dashboard from "../Pages/Dashboard";
import TermsConditions from "../Pages/TermsConditions";
import FormInscription from "../Pages/FormInscription";
import Profile from "../Pages/Profile";
import Menu from "../Pages/Menu";
import EditProfile from "../Pages/EditProfile";
import Shop from "../Pages/Shop";
import Informaicion from "../Pages/Informaicion";
import DatePlantation from "../Pages/DatePlantation";
import Crops from "../Pages/Crops";
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
import BookingForm from "../Pages/BookingForm";
import Dataset from "../Pages/Dataset";
import TransferMoney from "../Pages/TransferMoney";
import Info from "../Pages/Info";
import Earnings from "../Pages/Earnings";
import ShoppingCart from "../Pages/ShoppingCart";
import Admin from "../Pages/Admin";
import Post from "../Pages/Post";

const META = {
  REQUIRES_AUTH: Symbol("REQUIRES_AUTH"),
  HIDE_FOR_AUTH: Symbol("HIDE_FOR_AUTH"),
};

function PrivateRoute({ component: Component, meta = [], ...props }) {
  const [session] = useSession();
  const isAuthenticated = useMemo(() => session.token, [session.token]);

  if (isAuthenticated === false) {
    return <></>;
  }

  if (meta.includes(META.REQUIRES_AUTH) && !isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  if (meta.includes(META.HIDE_FOR_AUTH) && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Component {...props} />;
}

function Router() {
  return useRoutes([
    {
      path: "/form",
      element: <BookingForm />,
    },
    {
      path: "/signin",
      element: <PrivateRoute component={Signin} meta={[META.HIDE_FOR_AUTH]} />,
    },
    {
      path: "/signup",
      element: <PrivateRoute component={Signup} meta={[META.HIDE_FOR_AUTH]} />,
    },
    {
      path: "/privacy-policy",
      element: <TermsConditions />,
    },
    {
      path: "/",
      element: <PrivateRoute component={Dashboard} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/wallet",
      element: <PrivateRoute component={Wallet} meta={[META.REQUIRES_AUTH]} />,
      children: [
        {
          path: "transfer/:bank?",
          element: <TransferMoney />,
        },
      ],
    },
    {
      path: "/crops/:id?",
      element: <PrivateRoute component={Crops} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/info/:category?",
      element: <PrivateRoute component={Info} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/earnings",
      element: <PrivateRoute component={Earnings} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/shop",
      element: <PrivateRoute component={Shop} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/cart",
      element: <PrivateRoute component={ShoppingCart} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/admin",
      element: <PrivateRoute component={Admin} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/posts/:id",
      element: <PrivateRoute component={Post} meta={[META.REQUIRES_AUTH]} />,
    },
    //
    {
      path: "/inscription",
      element: <PrivateRoute component={FormInscription} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/menu",
      element: <PrivateRoute component={Menu} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/profile",
      element: <PrivateRoute component={Profile} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/editPerfil",
      element: <PrivateRoute component={EditProfile} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/informacion",
      element: <PrivateRoute component={Informaicion} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/informacion/vite/:id",
      element: <PrivateRoute component={DatePlantation} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/cosechaDetail",
      element: <PrivateRoute component={CosechaDetail} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/dineroDetail",
      element: <PrivateRoute component={DineroDetail} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/anotherDatas",
      element: <PrivateRoute component={AnotherDatas} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/anotherData/:id",
      element: <PrivateRoute component={OtherDataOptions} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/certificados",
      element: <PrivateRoute component={Certificate} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/passmoney",
      element: <PrivateRoute component={PasarDinero} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/products",
      element: <PrivateRoute component={Products} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/productDetail/:id",
      element: <PrivateRoute component={ProductDetail} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/checkout",
      element: <PrivateRoute component={Checkout} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/dashTable",
      element: <PrivateRoute component={Dataset} meta={[META.REQUIRES_AUTH]} />,
    },
  ]);
}

export default Router;
