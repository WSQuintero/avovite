import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import useSession from "../Hooks/useSession";
import PageWrapper from "../Components/PageWrapper";
import Contracts from "../Components/Admin/Contracts";
import Blog from "../Components/Admin/Blog";
import DateRanges from "../Components/Admin/DateRanges";
import Shop from "../Components/Admin/Shop";
import Concepts from "../Components/Admin/Concepts";
import Users from "../Components/Admin/Users";

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

  return (
    <PageWrapper collapseSidebar="admin">
      {section === "date-ranges" ? (
        <DateRanges />
      ) : section === "blog" ? (
        <Blog />
      ) : section === "shop" ? (
        <Shop />
      ) : section === "concepts" ? (
        <Concepts />
      ) : section === "users" ? (
        <Users />
      ) : (
        <Contracts />
      )}
    </PageWrapper>
  );
}

export default Admin;
