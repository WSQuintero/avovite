import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import { AndroidOutlined as SampleIcon } from "@mui/icons-material";

function CardMenu({ icon, title, helperText, mobile = false, onClick }) {
  return (
    <Card
      position="relative"
      elevation={0}
      sx={{ width: "100%", height: "100%", backgroundColor: "primary.main", borderRadius: 2 }}
    >
      <CardActionArea
        sx={(t) => ({
          width: "100%",
          height: "100%",
          paddingX: 3,
          paddingY: 4,
          [t.breakpoints.down("md")]: {
            padding: 2,
          },
          [mobile && t.breakpoints.up("md")]: {
            padding: 2,
          },
        })}
        onClick={onClick}
      >
        <Grid
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={1}
          height="100%"
          sx={(t) => ({
            [t.breakpoints.down("md")]: {
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            },
            [mobile && t.breakpoints.up("md")]: {
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            },
          })}
        >
          <Box display="flex" padding={1} borderRadius={1} sx={{ backgroundColor: "white" }}>
            {icon}
          </Box>
          <Grid display="flex" flexDirection="column" gap={1}>
            <Typography fontWeight={600} color="common.white">
              {title}
            </Typography>
            {helperText && (
              <Typography fontSize={12} fontWeight={300} marginTop="auto" color="common.white">
                {helperText}
              </Typography>
            )}
          </Grid>
          <Box position="absolute" right={16} bottom={0}>
            <SampleIcon sx={{ color: "white", fontSize: 48 }} />
          </Box>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

export default CardMenu;
