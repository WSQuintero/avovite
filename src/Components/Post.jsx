import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

function Post({ post, route }) {
  const breakpoint = "lg";
  const [hovered, setHovered] = useState(false);

  const isYouTubeVideo = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const convertToEmbedUrl = (url) => {
    if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtube.com")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // Return the original URL if it's not a YouTube video
  };

  return (
    <Box
      component={Paper}
      elevation={0}
      display="flex"
      flexDirection="row"
      alignItems="center"
      width="100%"
      borderRadius={2}
      sx={(t) => ({
        [t.breakpoints.down(breakpoint)]: {
          flexDirection: "column",
        },
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        display="flex"
        flexShrink={0}
        width={{ xs: "50%", lg: "40%" }} // Cambiado a 40%
        sx={{
          position: "relative",
          [breakpoint]: {
            width: "100%",
          },
        }}
      >
        <img
          src={post.url_image}
          alt="Post image"
          style={{ width: "100%", borderRadius: 8 * 2, objectFit: "cover", aspectRatio: 2 }}
        />
        {isYouTubeVideo(post.url_video) && (
          <iframe
            src={convertToEmbedUrl(post.url_video)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              display: hovered ? "block" : "none",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: 8 * 2,
            }}
            onLoad={() => console.log("Video loaded successfully")}
            onError={() => console.log("Error loading video")}
          ></iframe>
        )}
        {!isYouTubeVideo(post.url_video) && (
          <video
            src={post.url_video}
            alt="Post video"
            style={{
              display: hovered ? "block" : "none",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8 * 2,
            }}
            controls
          />
        )}
      </Box>

      <Grid flexGrow={1} display="flex" flexDirection="column" padding={2}>
        <Typography variant="h3" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "wrap" }}>
          {post.title}
        </Typography>
        <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "wrap", height: "110px" }}>
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
