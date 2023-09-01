import { Box, Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

function PageWrapper({ collapseSidebar, isInvalidSession = false, children }) {
  return (
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
  );
}

export default PageWrapper;
