import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Skeleton,
  Typography,
  Stack,
  Grow,
  TextField,
} from "@mui/material";
import { ResponsiveContainer, Legend, Tooltip, LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";
import useConfig from "../Hooks/useConfig";
import usePost from "../Hooks/usePost";
import PageWrapper from "../Components/PageWrapper";
import Post from "../Components/Post";
import useSession from "../Hooks/useSession";
import { BriefcaseIcon, BrokenIcon, InvestIcon, Statistic2Icon, TargetIcon } from "../Components/Icons";
import Theme from "../Theme";
import { formatCurrency, formatDate } from "../utilities";
import VitesImage from "../assets/img/common/vites.png";
import IconWhite from "../assets/img/common/icon_white.svg";
import { Check } from "@mui/icons-material";
import RechartsTooltip from "../Components/RechartsTooltip";
import DialogRequestAvocados from "../Components/Dialogs/RequestAvocados";
import { useSnackbar } from "notistack";
import DialogSellAvocados from "../Components/Dialogs/SellAvocados";
import SaleService from "../Services/sale.service";

const data = [
  {
    name: "Enero",
    pv: 2000000,
  },
  {
    name: "Febrero",
    pv: 4000000,
  },
  {
    name: "Marzo",
    pv: 2000000,
  },
  {
    name: "Abril",
    pv: 8314000,
  },
  {
    name: "Mayo",
    pv: 2483000,
  },
  {
    name: "Junio",
    pv: 6730000,
  },
  {
    name: "Julio",
    pv: 10000000,
  },
];

function Dashboard() {
  const [{ token }] = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [{ user }] = useSession();
  const [config, { setOnboarding }] = useConfig();
  const $Post = usePost();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState("");
  const $Sale = useMemo(() => (token ? new SaleService(token) : null), [token]);

  const handleUpdateSellingMode = async (mode, formData) => {
    const methods = {
      "request-avocados": "request",
      "sell-avocados": "sell",
    };

    const { status, data } = await $Sale[methods[mode]](formData);

    console.log(data);

    if (status) {
      setModal("");
      enqueueSnackbar(`Se ha creado petición para ${mode === "request-avocados" ? "solicitar" : "vender a terceros"} tus VITES`, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`Error al ${mode === "request-avocados" ? "solicitar" : "vender a terceros"} tus VITES`, {
        variant: "error",
      });
    }
  };

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
          <>
            <Grid display="flex" flexDirection="column" gap={8} width="100%">
              <Stack spacing={2}>
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
                      gap={4}
                      width="50%"
                      padding={4}
                      borderRadius={2}
                      sx={(t) => ({
                        backgroundColor: "secondary.main",
                        [t.breakpoints.down("lg")]: {
                          width: "100%",
                        },
                      })}
                    >
                      <Stack>
                        <Typography color="primary" lineHeight={1} textAlign="center">
                          Vites
                        </Typography>
                        <Typography color="white" lineHeight={1} textAlign="center">
                          Cantidad
                        </Typography>
                      </Stack>
                      <InvestIcon sx={{ fontSize: 128 }} />
                      <Stack>
                        <Typography fontSize={40} fontWeight={300} color="white" lineHeight={1} textAlign="center">
                          VITES
                        </Typography>
                        <Typography fontSize={40} fontWeight={700} color="white" lineHeight={1} textAlign="center">
                          {user.totalVites}
                        </Typography>
                      </Stack>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap={2}
                      width="50%"
                      padding={4}
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
                    position="relative"
                    width="50%"
                    padding={4}
                    borderRadius={2}
                    sx={(t) => ({
                      backgroundColor: "secondary.main",
                      [t.breakpoints.down("lg")]: {
                        width: "100%",
                      },
                    })}
                  >
                    <Stack direction="row" spacing={2}>
                      <Box width={80} height={80} padding={1} borderRadius={1} bgcolor="white">
                        <Statistic2Icon color={Theme.palette.primary.main} sx={{ fontSize: 64 }} />
                      </Box>
                      <Stack>
                        <Typography fontSize={24} color="white">
                          Valor aprx de mis cosechas
                        </Typography>
                        <Typography fontSize={32} fontWeight={600} color="white">
                          {formatCurrency(0, "$") || 0}
                        </Typography>
                      </Stack>
                    </Stack>
                    <img src={IconWhite} alt="Icon white" height={64} style={{ position: "absolute", right: 16, bottom: 16 }} />
                  </Box>
                </Grid>
                <Grid
                  display="flex"
                  gap={2}
                  sx={(t) => ({
                    [t.breakpoints.down("lg")]: {
                      flexDirection: "column",
                    },
                  })}
                >
                  <Box
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    width="50%"
                    padding={4}
                    borderRadius={2}
                    sx={(t) => ({
                      backgroundColor: "secondary.main",
                      [t.breakpoints.down("lg")]: {
                        width: "100%",
                      },
                    })}
                  >
                    <Stack>
                      <Typography fontWeight={600} color="white">
                        Cosechas
                      </Typography>
                      <Typography color="white">80 Kg</Typography>
                      <Typography color="white">{formatDate(new Date())}</Typography>
                    </Stack>
                    <Box sx={{ aspectRatio: 2.5 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart width={500} height={300} data={data}>
                          <CartesianGrid strokeDasharray="0" vertical={false} stroke="#ffffff44" />
                          <XAxis dataKey="name" fontSize={14} stroke="white" />
                          <Tooltip content={<RechartsTooltip />} />
                          <Line type="monotone" dataKey="pv" stroke={Theme.palette.primary.main} activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </Box>
                  <Box
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    width="50%"
                    padding={4}
                    borderRadius={2}
                    sx={(t) => ({
                      backgroundColor: "primary.main",
                      [t.breakpoints.down("lg")]: {
                        width: "100%",
                      },
                    })}
                  >
                    <Button
                      color="customWhite"
                      size="large"
                      variant="contained"
                      sx={{ justifyContent: "flex-start" }}
                      startIcon={<BrokenIcon color={Theme.palette.primary.main} />}
                      onClick={() => setModal("request-avocados")}
                    >
                      <Typography textAlign="left" lineHeight={1} py={1} color="primary.main">
                        Solicitar mis frutos
                      </Typography>
                    </Button>
                    <Button
                      color="customWhite"
                      size="large"
                      variant="contained"
                      sx={{ justifyContent: "flex-start" }}
                      startIcon={<TargetIcon color={Theme.palette.primary.main} />}
                      onClick={() => setModal("sell-avocados")}
                    >
                      <Typography textAlign="left" lineHeight={1} py={1} color="primary.main">
                        Autorizo vender mis frutos por Avovite o un tercero
                      </Typography>
                    </Button>
                  </Box>
                </Grid>
              </Stack>
              <Grid display="flex" flexDirection="column" gap={4}>
                <Typography variant="h2">Recientes</Typography>
                <Grid display="flex" flexDirection="column" gap={2}>
                  {loading
                    ? [...Array(3).keys()].map((post) => <Skeleton key={post} height={240} sx={{ transform: "none" }} />)
                    : posts.map((post) => <Post key={post.id} post={post} route={`/posts/${post.id}`} />)}
                </Grid>
              </Grid>
            </Grid>

            <DialogRequestAvocados
              open={modal === "request-avocados"}
              onClose={() => setModal("")}
              onSubmit={(data) => handleUpdateSellingMode("request-avocados", data)}
            />

            <DialogSellAvocados
              open={modal === "sell-avocados"}
              onClose={() => setModal("")}
              onSubmit={(data) => handleUpdateSellingMode("sell-avocados", data)}
            />
          </>
        ) : (
          <Grid display="flex" flexDirection="column" gap={2} width="100%">
            <Typography variant="h2" textAlign="center">
              Términos y Condiciones
            </Typography>
            <Typography textAlign="justify">
              Términos y Condiciones de Uso de la Aplicación Avovite app Por favor, lea detenidamente los siguientes términos y condiciones
              antes de utilizar la aplicación (&quot; Avovite app&quot;). Estos Términos constituyen un acuerdo legalmente vinculante entre
              usted (&quot;el Usuario&quot;) y [Avovite S.A.S] Al utilizar la Aplicación, usted acepta cumplir con estos Términos en su
              totalidad. Si no está de acuerdo con alguno de los términos o condiciones aquí establecidos, le pedimos que no utilice la
              Aplicación. Aplicación, usted acepta cumplir con estos Términos en su totalidad. Si no está de acuerdo con alguno de los
              términos o condiciones aquí establecidos, le pedimos que no utilice la Aplicación. Aplicación, usted acepta cumplir con estos
              Términos en su totalidad. Si no está de acuerdo con alguno de los términos o condiciones aquí establecidos, le pedimos que no
              utilice la Aplicación.
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
