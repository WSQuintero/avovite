import { Box, Button, Grid, Typography, alpha } from "@mui/material";
import { Link } from "react-router-dom";

function Post({ post, route }) {
  const breakpoint = "lg";

  return (
    <Box
      component="article"
      display="flex"
      width="100%"
      borderRadius={2}
      sx={(t) => ({
        backgroundColor: alpha(t.palette.primary.main, 0.1),
        [t.breakpoints.down(breakpoint)]: {
          flexDirection: "column",
        },
      })}
    >
      <Box
        display="flex"
        sx={(t) => ({
          width: "30%",
          [t.breakpoints.down(breakpoint)]: {
            width: "100%",
          },
        })}
      >
        <img
          src={post.url_image}
          alt="Post image"
          style={{ width: "100%", borderRadius: 8 * 2, objectFit: "cover", aspectRatio: 2 }}
        />
      </Box>
      <Grid flexGrow={1} display="flex" flexDirection="column" padding={2}>
        <Typography variant="h3">{post.title}</Typography>
        <Typography>{post.description}</Typography>
        <Button component={Link} sx={{ marginLeft: "auto", marginTop: "auto" }} to={route}>
          Ver más
        </Button>
      </Grid>
    </Box>
  );
}

export default Post;
