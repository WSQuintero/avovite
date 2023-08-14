import { Grid, Typography } from "@mui/material";

function FormRow({ title, description, children }) {
  return (
    <Grid display="flex" padding={2} flexWrap="wrap" gap={2}>
      <Grid
        display="flex"
        flexDirection="column"
        sx={(t) => ({
          width: "40%",
          [t.breakpoints.down("md")]: {
            width: "100%",
          },
        })}
      >
        <Typography variant="h2" fontSize={18} fontWeight={500} color="primary">
          {title}
        </Typography>
        {description && <Typography>{description}</Typography>}
      </Grid>
      <Grid flexGrow={1}>{children}</Grid>
    </Grid>
  );
}

export default FormRow;
