import { useMemo } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import useSession from "../Hooks/useSession";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import Dataset from "../Pages/Dataset";
import Dashboard from "../Pages/Dashboard";
import TermsConditions from "../Pages/TermsConditions";
import Shop from "../Pages/Shop";
import Wallet from "../Pages/Wallet";
import Checkout from "../Pages/Checkout";
import BookingForm from "../Pages/BookingForm";
import TransferMoney from "../Pages/TransferMoney";
import Info from "../Pages/Info";
import Earnings from "../Pages/Earnings";
import ShoppingCart from "../Pages/ShoppingCart";
import Admin from "../Pages/Admin";
import Post from "../Pages/Post";
import Profile from "../Pages/Profile";
import Contact from "../Pages/Contact";

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
      path: "/profile",
      element: <PrivateRoute component={Profile} meta={[META.REQUIRES_AUTH]} />,
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
      path: "/contracts",
      element: <PrivateRoute component={Dataset} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/posts/:id",
      element: <PrivateRoute component={Post} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/checkout",
      element: <PrivateRoute component={Checkout} meta={[META.REQUIRES_AUTH]} />,
    },
    {
      path: "/contact-us",
      element: <PrivateRoute component={Contact} meta={[META.REQUIRES_AUTH]} />,
    },
  ]);
}

export default Router;
