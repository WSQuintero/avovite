import { useMemo } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import useSession from "../Hooks/useSession";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import Dashboard from "../Pages/Dashboard";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Shop from "../Pages/Shop";
import Wallet from "../Pages/Wallet";
import Checkout from "../Pages/Checkout";
import BookingForm from "../Pages/BookingForm";
import BookingFormMortgage from "../Pages/BookingFormMortgage";
import TransferMoney from "../Pages/TransferMoney";
import Info from "../Pages/Info";
import Earnings from "../Pages/Earnings";
import ShoppingCart from "../Pages/ShoppingCart";
import Admin from "../Pages/Admin";
import Post from "../Pages/Post";
import Profile from "../Pages/Profile";
import Contact from "../Pages/Contact";
import ContractValidation from "../Pages/ContractValidation";
import ContractPaymentValidation from "../Pages/ContractPaymentValidation";
import Vites from "../Pages/Vites";
import Transactions from "../Pages/Transactions";
import Harvests from "../Pages/Harvests";

const REQUIRES_AUTH = "REQUIRES_AUTH";
const REQUIRES_ADMIN = "REQUIRES_ADMIN";
const HIDE_FOR_AUTH = "HIDE_FOR_AUTH";
const HIDE_FOR_ADMIN = "HIDE_FOR_ADMIN";
const REQUIRES_VALIDATION = "REQUIRES_VALIDATION";

function PrivateRoute({ component: Component, meta = [], ...props }) {
  const [session] = useSession();
  const isAuthenticated = useMemo(() => session.token, [session.token]);
  const isAdmin = useMemo(() => session.user?.isAdmin(), [session.user]);

  if (isAuthenticated === false) {
    return <></>;
  }

  if (meta.includes(REQUIRES_VALIDATION)) {
    if (session.user) {
      if (session.user.pending_to_pay_contracts) {
        return <Navigate to="/validation/payment" />;
      }
      if (session.user.pending_payed_contracts) {
        return <Navigate to="/validation/confirmation" />;
      }
    }
  }

  if (meta.includes(HIDE_FOR_AUTH)) {
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }
  }

  if (meta.includes(HIDE_FOR_ADMIN)) {
    if (isAdmin) {
      return <Navigate to="/admin" />;
    }
  }

  if (meta.includes(REQUIRES_AUTH, REQUIRES_VALIDATION)) {
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }
  }

  if (meta.includes(REQUIRES_ADMIN)) {
    if (!isAdmin) {
      return <Navigate to="/" />;
    }
  }

  return <Component {...props} />;
}

function Router() {
  return useRoutes([
    {
      path: "/registro-contrato",
      element: <BookingForm />,
    },
    {
      path: "/registro-contrato-hipoteca",
      element: <BookingFormMortgage />,
    },
    {
      path: "/signin",
      element: <PrivateRoute component={Signin} meta={[HIDE_FOR_AUTH]} />,
    },
    {
      path: "/signup",
      element: <PrivateRoute component={Signup} meta={[HIDE_FOR_AUTH]} />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "/dashboard",
      element: <PrivateRoute component={Dashboard} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/vites",
      element: <PrivateRoute component={Vites} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/transactions",
      element: <PrivateRoute component={Transactions} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/harvests",
      element: <PrivateRoute component={Harvests} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/profile",
      element: <PrivateRoute component={Profile} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION]} />,
    },
    {
      path: "/wallet",
      element: <PrivateRoute component={Wallet} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION]} />,
      children: [
        {
          path: "transfer/:bank?",
          element: <TransferMoney />,
        },
      ],
    },
    {
      path: "/info/:category?",
      element: <PrivateRoute component={Info} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION]} />,
    },
    {
      path: "/earnings",
      element: <PrivateRoute component={Earnings} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/shop",
      element: <PrivateRoute component={Shop} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/cart",
      element: <PrivateRoute component={ShoppingCart} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/checkout",
      element: <PrivateRoute component={Checkout} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/admin/:section?",
      element: <PrivateRoute component={Admin} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION]} />,
    },
    {
      path: "/posts/:id",
      element: <PrivateRoute component={Post} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/contact-us",
      element: <PrivateRoute component={Contact} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION]} />,
    },
    {
      path: "/validation/payment",
      element: <PrivateRoute component={ContractPaymentValidation} meta={[REQUIRES_AUTH]} />,
    },
    {
      path: "/validation/confirmation",
      element: <PrivateRoute component={ContractValidation} meta={[REQUIRES_AUTH]} />,
    },
  ]);
}

export default Router;
