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
import BookingForm from "../Pages/BookingForm";
import Dataset from "../Pages/Dataset";

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
      element: <Dashboard />,
    },
    {
      path: "/inscription",
      element: <FormInscription />,
    },
    {
      path: "/menu",
      element: <Menu />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/editPerfil",
      element: <EditProfile />,
    },
    {
      path: "/vites",
      element: <Vites />,
    },
    {
      path: "/informacion",
      element: <Informaicion />,
    },
    {
      path: "/informacion/vite/:id",
      element: <DatePlantation />,
    },
    {
      path: "/cosechas",
      element: <Cosechas />,
    },
    {
      path: "/cosechaDetail",
      element: <CosechaDetail />,
    },
    {
      path: "/dineroDetail",
      element: <DineroDetail />,
    },
    {
      path: "/anotherDatas",
      element: <AnotherDatas />,
    },
    {
      path: "/anotherData/:id",
      element: <OtherDataOptions />,
    },
    {
      path: "/certificados",
      element: <Certificate />,
    },
    {
      path: "/wallet",
      element: <Wallet />,
    },
    {
      path: "/passmoney",
      element: <PasarDinero />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/productDetail/:id",
      element: <ProductDetail />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/form",
      element: <BookingForm />,
    },
    {
      path: "/dashTable",
      element: <Dataset />,
    },
  ]);
}

export default Router;
