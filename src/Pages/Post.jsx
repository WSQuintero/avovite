import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePost from "../Hooks/usePost";
import PageWrapper from "../Components/PageWrapper";
import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import { formatDate } from "../utilities";

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
function Post() {
  const { id } = useParams();
  const $Post = usePost();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    const { status, data } = await $Post.get({ id });

    if (status) {
      setPost(data.data);
    }
  };

  useEffect(() => {
    if ($Post) {
      (async () => {
        await fetchPost();
        setLoading(false);
      })();
    }
  }, [$Post]);

  return (
    <PageWrapper>
      <Container>
        {loading ? (
          <Grid display="flex" flexDirection="column" gap={2}>
            <Skeleton variant="rounded" width="100%" sx={{ height: "auto", aspectRatio: 2 }} />
            <Grid>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
            </Grid>
          </Grid>
        ) : (
          <Grid display="flex" flexDirection="column" gap={2}>
            <Box
              position="relative"
              display="flex"
              alignItems="flex-end"
              padding={2}
              borderRadius={2}
              sx={(t) => ({
                aspectRatio: 2,
                backgroundImage: `url(${post.url_image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                "&::after": {
                  content: "''",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: 2,
                  backgroundImage: `linear-gradient(180deg, transparent, ${t.palette.primary.main})`,
                  mixBlendMode: "multiply",
                },
                [t.breakpoints.down("md")]: {
                  alignItems: "center",
                  justifyContent: "center",
                  aspectRatio: 1,
                  textAlign: "center",
                },
              })}
            >
              <Grid
                zIndex={1}
                display="flex"
                flexDirection="column"
                width="100%"
                sx={(t) => ({
                  [t.breakpoints.down("md")]: {
                    flexDirection: "column",
                    alignItems: "center",
                  },
                })}
              >
                <Typography variant="h2" fontSize={48} color="white">
                  {post.title}
                </Typography>
                <Typography
                  color="white"
                  width="100%"
                  textAlign="end"
                  sx={(t) => ({
                    [t.breakpoints.down("md")]: {
                      textAlign: "center",
                    },
                  })}
                >
                  {formatDate(post.updated_at)}
                </Typography>
              </Grid>
            </Box>
            <Typography>{post.description}</Typography>
            <Grid sx={{ aspectRatio: 16 / 9 }}>
              {isYouTubeVideo(post.url_video) ? (
                <iframe
                  src={convertToEmbedUrl(post.url_video)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8, border: 0 }}
                />
              ) : (
                <video src={post.url_video} width="100%" style={{ objectFit: "cover", borderRadius: 8 }} muted autoPlay />
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </PageWrapper>
  );
}

export default Post;
