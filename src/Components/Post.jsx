import { Box, Button, Grid, Paper, Typography, alpha } from "@mui/material";
import { Link } from "react-router-dom";

function Post({ post, route }) {
  const breakpoint = "lg";

  return (
    <Box
      component={Paper}
      elevation={0}
      display="flex"
      width="100%"
      borderRadius={2}
      sx={(t) => ({
        [t.breakpoints.down(breakpoint)]: {
          flexDirection: "column",
        },
      })}
    >
      <Box
        display="flex"
        flexShrink={0}
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
        <Typography
          variant="h3"
          sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}
        >
          {post.title}
        </Typography>
        <Typography
          sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 3 }}
        >
          {post.description}
        </Typography>
        <Button component={Link} sx={{ marginLeft: "auto", marginTop: "auto" }} to={route}>
          Ver más
        </Button>
      </Grid>
    </Box>
  );
}

export default Post;
