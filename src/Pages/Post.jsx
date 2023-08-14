import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePost from "../Hooks/usePost";
import PageWrapper from "../Components/PageWrapper";
import { Box, Container, Grid, Typography } from "@mui/material";
import { formatDate } from "../utilities";

function Post() {
  const { id } = useParams();
  const $Post = usePost();
  const [post, setPost] = useState({});

  const fetchPost = async () => {
    const { status, data } = await $Post.get({ id });

    if (status) {
      setPost(data);
    }
  };

  useEffect(() => {
    if ($Post) {
      fetchPost();
    }
  }, [$Post]);

  return (
    <PageWrapper>
      <Container>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Box
            position="relative"
            display="flex"
            alignItems="flex-end"
            padding={2}
            borderRadius={2}
            sx={(t) => ({
              aspectRatio: 2,
              backgroundImage: `url(${post.image})`,
              "&::after": {
                content: "''",
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                borderRadius: 2,
                backgroundImage: `linear-gradient(180deg, transparent, ${t.palette.primary.main})`,
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
              justifyContent="space-between"
              alignItems="flex-end"
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
              <Typography color="white">{formatDate(new Date())}</Typography>
            </Grid>
          </Box>
          <Typography>{post.description}</Typography>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Post;
