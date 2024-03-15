import { Box, DialogTitle, Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DialogKYC from "./Dialogs/KYC";
import useSession from "../Hooks/useSession";
import useUser from "../Hooks/useUser";
import { useEffect, useState } from "react";

function PageWrapper({ collapseSidebar, isInvalidSession = false, children }) {
  const [session, { setUser, logout }] = useSession();
  const $User = useUser();
  const [isKyc, setIsKyc] = useState(false);
  const [notIsKyc, setNotIsKyc] = useState(false);

  return (
    <>
      <Grid display="flex">
        {!isInvalidSession && <Sidebar collapseOn={collapseSidebar} />}
        <Grid flexGrow={1} display="flex" flexDirection="column" minHeight="100vh">
          <Header isInvalidSession={isInvalidSession} />
          <Box
            component="main"
            flexGrow={1}
            padding={6}
            sx={(t) => ({
              maxWidth: isInvalidSession ? "100vw" : `calc(100vw - ${t.sizes.sidebar.main}px - 16px)`,
              [t.breakpoints.down("lg")]: {
                maxWidth: "100vw",
                padding: 2,
                paddingTop: 12,
              },
            })}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default PageWrapper;
