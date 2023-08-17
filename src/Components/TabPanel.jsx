import { Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box role="tabpanel" hidden={value !== index} {...other}>
      <Box display={value === index ? "initial" : "none"} padding={2}>
        {children}
      </Box>
    </Box>
  );
}

export default TabPanel;
