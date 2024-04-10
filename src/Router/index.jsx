import { useEffect, useMemo, useState } from "react";
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
import HarvestDetail from "../Pages/HarvestDetail";
import HarvestCertificates from "../Pages/HarvestCertificates";
import ForgotPassword from "../Pages/ForgotPassword";
import Callback from "../Pages/Callback";
import Payments from "../Pages/Payments";
import Production from "../Pages/Production";
import { ContractDetail } from "../Components/Admin";
import DetailsProduction from "../Pages/DetailsProduction";
import TicketForm from "../Pages/TicketForm";
import TicketList from "../Pages/TicketList";
import Movements from "../Pages/Movements";
import ContractService from "../Services/contract.service";
import PendingFirm from "../Pages/PendingFirm";

const REQUIRES_AUTH = "REQUIRES_AUTH";
const REQUIRES_ADMIN = "REQUIRES_ADMIN";
const HIDE_FOR_AUTH = "HIDE_FOR_AUTH";
const HIDE_FOR_ADMIN = "HIDE_FOR_ADMIN";
const REQUIRES_VALIDATION = "REQUIRES_VALIDATION";
const REQUIRES_CONTRACTS = "REQUIRES_CONTRACTS";

let wasRedirected = false;

function PrivateRoute({ component: Component, meta = [], ...props }) {
  const [session] = useSession();
  const isAuthenticated = useMemo(() => session.token, [session.token]);
  const isAdmin = useMemo(() => session.user?.isAdmin(), [session.user]);
  const $Contract = useMemo(() => (session.token ? new ContractService(session.token) : null), [session.token]);
  if (isAuthenticated === false) {
    return <></>;
  }

  if (!isAdmin && session?.user?.totalVites === 0 && !wasRedirected && meta.includes(REQUIRES_CONTRACTS)) {
    wasRedirected = true;
    return <Navigate to="/shop" />;
  }

  if (meta.includes(REQUIRES_VALIDATION)) {
    if (session?.user) {
      if (session?.user?.pending_to_pay_contracts) {
        return <Navigate to="/validation/payment" />;
      }

      if (!session?.user?.isAdmin()) {
        if (
          session?.user?.pending_payed_contracts ||
          session?.user?.last_contract?.state_second_form === 0 ||
          session.user.contractPedingWhiteList.length > 0
        ) {
          return <Navigate to="/validation/confirmation" />;
        }
      }
      if (!session?.user?.isAdmin()) {
        if (session?.user?.pending_signature_contract.length > 0 || session?.user?.pending_signature_second_form.length > 0) {
          return <Navigate to="/validation/firm" />;
        }
      }
    }
  } //aquí está la validación para saber si tiene contratos pendientes

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
      element: <PrivateRoute component={BookingForm} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION]} />,
    },
    {
      path: "/registro-contrato-hipoteca",
      element: <PrivateRoute component={BookingFormMortgage} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION]} />,
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
      path: "/forgot-password",
      element: <PrivateRoute component={ForgotPassword} />,
    },
    {
      path: "/reset-password",
      element: <PrivateRoute component={ForgotPassword} />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "/dashboard",
      element: <PrivateRoute component={Dashboard} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, REQUIRES_CONTRACTS, HIDE_FOR_ADMIN]} />,
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
      path: "/payments",
      element: <PrivateRoute component={Payments} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/harvests",
      element: <PrivateRoute component={Harvests} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/harvests/:contractId",
      element: <PrivateRoute component={HarvestDetail} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/harvests/:contractId/certificates",
      element: <PrivateRoute component={HarvestCertificates} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
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
      path: "/production/:id",
      element: <PrivateRoute component={Production} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/details-production",
      element: <PrivateRoute component={DetailsProduction} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
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
      path: "/admin/contracts/:id",
      element: <PrivateRoute component={ContractDetail} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION]} />,
    },
    {
      path: "/form-tickets",
      element: <PrivateRoute component={TicketForm} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION, HIDE_FOR_ADMIN]} />,
    },
    {
      path: "/admin/ticket-list",
      element: <PrivateRoute component={TicketList} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION]} />,
    },
    {
      path: "/admin/movements",
      element: <PrivateRoute component={Movements} meta={[REQUIRES_AUTH, REQUIRES_VALIDATION]} />,
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
    {
      path: "/validation/firm",
      element: <PrivateRoute component={PendingFirm} meta={[REQUIRES_AUTH]} />,
    },
    {
      path: "/callback/:section",
      element: <Callback />,
    },
  ]);
}

export default Router;
