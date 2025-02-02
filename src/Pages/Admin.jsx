import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSession from "../Hooks/useSession";
import PageWrapper from "../Components/PageWrapper";
import {
  Contracts,
  Blog,
  DateRanges,
  Shop,
  Concepts,
  Suppliers,
  Users,
  Whitelist,
  Harvests,
  PaymentSplit,
  Verifik,
  Marketing,
} from "../Components/Admin/";
import TicketList from "./TicketList";

const SECTIONS = {
  harvests: <Harvests />,
  "date-ranges": <DateRanges />,
  "payment-split": <PaymentSplit />,
  blog: <Blog />,
  shop: <Shop />,
  concepts: <Concepts />,
  suppliers: <Suppliers />,
  users: <Users />,
  ticketList:<TicketList/>,
  verifik: <Verifik />,
  whitelist: <Whitelist />,
  marketing: <Marketing/>
};

function Admin() {
  const { section } = useParams();
  const navigate = useNavigate();
  const [session] = useSession();

  useEffect(() => {
    if (!section) {
      navigate("/admin/contracts");
    }
  }, [section]);

  useEffect(() => {
    if (session.user && !session.user.isAdmin()) {
      navigate("/");
    }
  }, [session.user]);

  return <PageWrapper collapseSidebar="admin">{SECTIONS[section] || <Contracts />}</PageWrapper>;
}

export default Admin;
