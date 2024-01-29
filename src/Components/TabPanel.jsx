import { Box } from "@mui/material";

function TabPanel({ children, value, index, unmountOnExit = false, ...props }) {
  return (
    <Box role="tabpanel" hidden={value !== index} {...props}>
      {(!unmountOnExit || value === index) && (
        <Box display={value === index ? "initial" : "none"} padding={2}>
          {children}
        </Box>
      )}
    </Box>
  );
}

export default TabPanel;
