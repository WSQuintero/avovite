import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import useSession from "../Hooks/useSession";
import PageWrapper from "../Components/PageWrapper";
import Contracts from "../Components/Admin/Contracts";
import Blog from "../Components/Admin/Blog";
import DateRanges from "../Components/Admin/DateRanges";
import Shop from "../Components/Admin/Shop";

function Admin() {
  const { section } = useParams();
  const navigate = useNavigate();
  const [session] = useSession();

  useEffect(() => {
    if (session.user && !session.user.isAdmin()) {
      navigate("/");
    }
  }, [session.user]);

  if (section === "date-ranges") {
    return (
      <PageWrapper>
        <DateRanges />
      </PageWrapper>
    );
  } else if (section === "blog") {
    return (
      <PageWrapper>
        <Blog />
      </PageWrapper>
    );
  } else if (section === "shop") {
    return (
      <PageWrapper>
        <Shop />
      </PageWrapper>
    );
  } else {
    return (
      <PageWrapper>
        <Contracts />
      </PageWrapper>
    );
  }
}

export default Admin;
