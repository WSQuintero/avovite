import { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Grid, Skeleton, Typography, alpha } from "@mui/material";
import useConfig from "../Hooks/useConfig";
import usePost from "../Hooks/usePost";
import PageWrapper from "../Components/PageWrapper";
import Post from "../Components/Post";
import VitesImage from "../assets/img/common/vites.png";
import useSession from "../Hooks/useSession";

function Dashboard() {
  const [{ user }] = useSession();
  const [config, { setOnboarding }] = useConfig();
  const $Post = usePost();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { status, data } = await $Post.get();

    if (status) {
      setPosts(data.data);
    }
  };

  useEffect(() => {
    if ($Post) {
      (async () => {
        await fetchPosts();
        setLoading(false);
      })();
    }
  }, [$Post]);

  if (!user) {
    return <></>;
  }

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        {!config.onboarding ? (
          <Grid display="flex" flexDirection="column" gap={8} width="100%">
            <Grid
              display="flex"
              gap={2}
              sx={(t) => ({
                [t.breakpoints.down("lg")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Grid
                display="flex"
                gap={2}
                width="50%"
                sx={(t) => ({
                  [t.breakpoints.down("lg")]: {
                    flexDirection: "column",
                    width: "100%",
                  },
                })}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                  width="50%"
                  padding={2}
                  borderRadius={2}
                  sx={(t) => ({
                    backgroundColor: "secondary.main",
                    [t.breakpoints.down("lg")]: {
                      width: "100%",
                    },
                  })}
                >
                  <Typography color="primary" lineHeight={1}>
                    Vites
                  </Typography>
                  <img src={VitesImage} alt="vites image" style={{ width: "50%" }} />
                  <Typography fontSize={40} fontWeight={300} color="white" lineHeight={1}>
                    VITES
                  </Typography>
                  <Typography fontSize={40} fontWeight={700} color="white" lineHeight={1}>
                    {user.vites_balance}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  width="50%"
                  padding={2}
                  borderRadius={2}
                  sx={(t) => ({
                    backgroundColor: "primary.main",
                    [t.breakpoints.down("lg")]: {
                      width: "100%",
                    },
                  })}
                >
                  <Typography fontWeight={600} textAlign="center" color="common.white">
                    Datos
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    borderRadius={2}
                    padding={2}
                    sx={{ backgroundColor: "white" }}
                  >
                    <Typography fontWeight={600} color="primary">
                      Maduros
                    </Typography>
                    <Typography color="primary">{user.trees_balance}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    borderRadius={2}
                    padding={2}
                    sx={{ backgroundColor: "white" }}
                  >
                    <Typography fontWeight={600} textAlign="center" color="primary">
                      En crecimiento
                    </Typography>
                    <Typography color="primary">{user.trees_balance}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Box
                width="50%"
                padding={2}
                borderRadius={2}
                sx={(t) => ({
                  backgroundColor: "secondary.main",
                  [t.breakpoints.down("lg")]: {
                    width: "100%",
                  },
                })}
              ></Box>
            </Grid>
            <Grid display="flex" flexDirection="column" gap={4}>
              <Typography variant="h2">Recientes</Typography>
              <Grid display="flex" flexDirection="column" gap={2}>
                {loading
                  ? [...Array(3).keys()].map((post) => <Skeleton key={post} height={240} sx={{ transform: "none" }} />)
                  : posts.map((post) => <Post key={post.id} post={post} route={`/posts/${post.id}`} />)}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid display="flex" flexDirection="column" gap={2} width="100%">
            <Typography variant="h2" textAlign="center">
              Términos y Condiciones
            </Typography>
            <Typography textAlign="justify">
              Términos y Condiciones de Uso de la Aplicación Avovite app Por favor, lea detenidamente los siguientes
              términos y condiciones antes de utilizar la aplicación (&quot; Avovite app&quot;). Estos Términos
              constituyen un acuerdo legalmente vinculante entre usted (&quot;el Usuario&quot;) y [Avovite S.A.S] Al
              utilizar la Aplicación, usted acepta cumplir con estos Términos en su totalidad. Si no está de acuerdo con
              alguno de los términos o condiciones aquí establecidos, le pedimos que no utilice la Aplicación.
              Aplicación, usted acepta cumplir con estos Términos en su totalidad. Si no está de acuerdo con alguno de
              los términos o condiciones aquí establecidos, le pedimos que no utilice la Aplicación. Aplicación, usted
              acepta cumplir con estos Términos en su totalidad. Si no está de acuerdo con alguno de los términos o
              condiciones aquí establecidos, le pedimos que no utilice la Aplicación.
            </Typography>
            <Grid display="flex" gap={2}>
              <Button variant="contained" size="large" fullWidth onClick={() => setOnboarding(false)}>
                Aceptar
              </Button>
              <Button variant="outlined" size="large" fullWidth>
                Cancelar
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </PageWrapper>
  );
}

export default Dashboard;
