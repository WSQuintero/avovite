import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSession from "../Hooks/useSession";
import PageWrapper from "../Components/PageWrapper";
import Contracts from "../Components/Admin/Contracts";
import Blog from "../Components/Admin/Blog";
import DateRanges from "../Components/Admin/DateRanges";
import Shop from "../Components/Admin/Shop";
import Concepts from "../Components/Admin/Concepts";
import Suppliers from "../Components/Admin/Suppliers";
import Users from "../Components/Admin/Users";
import Whitelist from "../Components/Admin/Whitelist";
import Harvests from "../Components/Admin/Harvests";

const SECTIONS = {
  harvests: <Harvests />,
  "date-ranges": <DateRanges />,
  blog: <Blog />,
  shop: <Shop />,
  concepts: <Concepts />,
  suppliers: <Suppliers />,
  users: <Users />,
  whitelist: <Whitelist />,
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
