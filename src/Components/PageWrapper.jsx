import { Box, Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

function PageWrapper({ hideSidebar = false, hideHeader = false, children }) {
  return (
    <Grid display="flex">
      <Sidebar />
      <Grid flexGrow={1} display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box
          component="main"
          flexGrow={1}
          padding={6}
          sx={(t) => ({
            maxWidth: `calc(100vw - ${t.sizes.sidebar.main}px)`,
            [t.breakpoints.down("md")]: {
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
