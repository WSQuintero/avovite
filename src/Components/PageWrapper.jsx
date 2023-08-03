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
            [t.breakpoints.down("md")]: {
              padding: 4,
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
