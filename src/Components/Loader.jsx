import { alpha, Box, CircularProgress, Dialog, SvgIcon } from "@mui/material";

function Loader({ show }) {
  if (!show) {
    return <></>;
  }

  return (
    <Box
      position="fixed"
      zIndex={1400}
      top={0}
      left={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      sx={{ backgroundColor: alpha("#ffffff", 1) }}
    >
      <SvgIcon
        fontSize="large"
        sx={(t) => ({
          fill: t.palette.primary.main,
          animation: "spin 1s linear infinite",
          "@keyframes spin": {
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
        })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <path d="M10 40v-1.1-1.3-.8c0-.3.1-.6.1-.9.1-.6.1-1.4.2-2.1.2-.8.3-1.6.5-2.5.2-.9.6-1.8.8-2.8.3-1 .8-1.9 1.2-3 .5-1 1.1-2 1.7-3.1.7-1 1.4-2.1 2.2-3.1 1.6-2.1 3.7-3.9 6-5.6 2.3-1.7 5-3 7.9-4.1.7-.2 1.5-.4 2.2-.7.7-.3 1.5-.3 2.3-.5.8-.2 1.5-.3 2.3-.4l1.2-.1.6-.1h.6c1.5 0 2.9-.1 4.5.2.8.1 1.6.1 2.4.3.8.2 1.5.3 2.3.5 3 .8 5.9 2 8.5 3.6 2.6 1.6 4.9 3.4 6.8 5.4 1 1 1.8 2.1 2.7 3.1.8 1.1 1.5 2.1 2.1 3.2.6 1.1 1.2 2.1 1.6 3.1.4 1 .9 2 1.2 3 .3 1 .6 1.9.8 2.7.2.9.3 1.6.5 2.4.1.4.1.7.2 1 0 .3.1.6.1.9.1.6.1 1 .1 1.4.4 1 .4 1.4.4 1.4.2 2.2-1.5 4.1-3.7 4.3s-4.1-1.5-4.3-3.7v-.7-.9-1.1-.7c0-.2-.1-.5-.1-.8-.1-.6-.1-1.2-.2-1.9s-.3-1.4-.4-2.2c-.2-.8-.5-1.6-.7-2.4-.3-.8-.7-1.7-1.1-2.6-.5-.9-.9-1.8-1.5-2.7-.6-.9-1.2-1.8-1.9-2.7-1.4-1.8-3.2-3.4-5.2-4.9-2-1.5-4.4-2.7-6.9-3.6-.6-.2-1.3-.4-1.9-.6-.7-.2-1.3-.3-1.9-.4-1.2-.3-2.8-.4-4.2-.5h-2c-.7 0-1.4.1-2.1.1-.7.1-1.4.1-2 .3-.7.1-1.3.3-2 .4-2.6.7-5.2 1.7-7.5 3.1-2.2 1.4-4.3 2.9-6 4.7-.9.8-1.6 1.8-2.4 2.7-.7.9-1.3 1.9-1.9 2.8-.5 1-1 1.9-1.4 2.8-.4.9-.8 1.8-1 2.6-.3.9-.5 1.6-.7 2.4-.2.7-.3 1.4-.4 2.1-.1.3-.1.6-.2.9 0 .3-.1.6-.1.8 0 .5-.1.9-.1 1.3-.2.7-.2 1.1-.2 1.1z"></path>
        </svg>
      </SvgIcon>
    </Box>
  );
}

export default Loader;
