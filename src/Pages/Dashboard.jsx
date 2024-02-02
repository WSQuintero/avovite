import { useEffect, useMemo, useState } from "react";
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Skeleton, 
  Typography, 
  Stack, 
  Icon, 
  Tooltip as MuiTooltip,
} from "@mui/material";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, Line, Tooltip, YAxis, Label } from "recharts";
import useConfig from "../Hooks/useConfig";
import usePost from "../Hooks/usePost";
import PageWrapper from "../Components/PageWrapper";
import Post from "../Components/Post";
import useSession from "../Hooks/useSession";
import { BrokenIcon, InvestIcon, InvestmentIcon, TargetIcon } from "../Components/Icons";
import Theme from "../Theme";
import { formatCurrency } from "../utilities";
import IconWhite from "../assets/img/common/icon_white.svg";
import RechartsTooltip from "../Components/RechartsTooltip";
import DialogRequestAvocados from "../Components/Dialogs/RequestAvocados";
import { useSnackbar } from "notistack";
import DialogSellAvocados from "../Components/Dialogs/SellAvocados";
import SaleService from "../Services/sale.service";
import dayjs from "dayjs";
import TermsAndConditions from "../Components/TermsAndConditions";
import useUser from "../Hooks/useUser";
import { LoadingButton } from "@mui/lab";

function Dashboard() {
  const [{ user, token }, { setUser }] = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const $Post = usePost();
  const $User = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [modal, setModal] = useState("");
  const $Sale = useMemo(() => (token ? new SaleService(token) : null), [token]);
  const chartData = useMemo(
    () =>
      user?.cost_effectiveness.map((data) => ({
        x: dayjs(data.dateCreate).format("DD MMMM"),
        y: data.kg_correspondence,
        tooltip: data.payment_correspondence,
      })) || [],
    [user]
  );

  const handleUpdateSellingMode = async (mode, formData) => {
    const methods = {
      "request-avocados": "request",
      "sell-avocados": "sell",
    };

    const { status } = await $Sale[methods[mode]](formData);

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

  const handleAcceptTerms = async () => {
    setLoadingSubmit(true);

    const { status } = await $User.updateTermsAndConditions({ status: true });

    if (status) {
      enqueueSnackbar("Se ha aceptado los términos y condiciones correctamente", {
        variant: "success",
      });
      setUser({ ...user, status_terms_and_conditions: 1 });
      window.scrollTo(0, 0);
    } else {
      enqueueSnackbar("Error al aceptar los términos y condiciones. Inténtalo de nuevo", {
        variant: "error",
      });
    }

    setLoadingSubmit(false);
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
        {user.status_terms_and_conditions === 1 ? (
          <>
            <Grid display="flex" flexDirection="column" gap={8} width="100%">
              <Stack spacing={2}>
                <Grid display="flex" flexDirection={{ xs: "column", lg: "row" }} gap={2}>
                  <Grid display="flex" flexDirection={{ xs: "column", lg: "row" }} gap={2} width={{ xs: "100%", xl: "66%" }}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      gap={4}
                      width={{ xs: "100%", lg: "50%" }}
                      padding={4}
                      borderRadius={2}
                      sx={(t) => ({
                        backgroundColor: "secondary.main",
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
                          VITE{Number(user.totalVites) === 1 ? "" : "S"}
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
                      width={{ xs: "100%", lg: "50%" }}
                      padding={4}
                      borderRadius={2}
                      sx={(t) => ({
                        backgroundColor: "primary.main",
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
                        <Typography color="primary">{user.vites_mature}</Typography>
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
                        <Typography color="primary">{user.vites_growth}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Box
                    position="relative"
                    width={{ xs: "100%", lg: "33%" }}
                    padding={4}
                    borderRadius={2}
                    sx={(t) => ({
                      backgroundColor: "secondary.main",
                    })}
                  >
                    <Stack alignItems="center" justifyContent="center" spacing={3}>
                      <Typography fontSize={24} color="white">
                        Kg aprx de mis cosechas
                      </Typography>
                      <InvestmentIcon sx={{ fontSize: 128 }} />
                      <Typography fontSize={40} fontWeight={600} color="white">
                        {formatCurrency(Number(user.vites_approx_kg).toFixed(2)) || 0}
                      </Typography>
                    </Stack>
                    <img src={IconWhite} alt="Icon white" height={64} style={{ position: "absolute", right: 16, bottom: 16 }} />
                  </Box>
                </Grid>
                <Grid display="flex" flexDirection={{ xs: "column", lg: "row" }} gap={2}>
                  <Box
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    width={{ xs: "100%", lg: "50%" }}
                    padding={4}
                    borderRadius={2}
                    sx={(t) => ({
                      backgroundColor: "secondary.main",
                      [t.breakpoints.down("lg")]: {},
                    })}
                  >
                    <Stack>
                      <Typography fontWeight={600} color="white">
                        Cosechas
                      </Typography>
                      <Typography color="white">{chartData.reduce((a, b) => a + b.y, 0)} Kg</Typography>
                      <Typography color="white">{dayjs(new Date()).format("DD MMMM YYYY")}</Typography>
                    </Stack>
                    <Box sx={{ aspectRatio: 2.5 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart width={500} height={300} data={chartData.length === 1 ? [...chartData, ...chartData] : chartData}>
                          <CartesianGrid strokeDasharray="0" vertical={false} stroke="#ffffff44" />
                          <XAxis dataKey="x" fontSize={14} stroke="white" />
                          <YAxis fontSize={14} stroke="transparent" width={24}>
                            <Label
                              style={{
                                fontSize: 12,
                                fill: "white",
                              }}
                              angle={270}
                              value={"Kilogramos (ft.)"}
                            />
                          </YAxis>
                          <Tooltip content={<RechartsTooltip />} />
                          <Line type="monotone" dataKey="y" stroke={Theme.palette.primary.main} activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </Box>
                  <Box
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    width={{ xs: "100%", lg: "50%" }}
                    padding={4}
                    borderRadius={2}
                    sx={(t) => ({
                      backgroundColor: "primary.main",
                      [t.breakpoints.down("lg")]: {},
                    })}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Button
                        fullWidth
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
                      {user.sales_request.length > 0 && (
                        <MuiTooltip
                          title={`Ya has creado previamente una solicitud de retiro para los contratos ${user.sales_request
                            .map((sale) => `AV-${sale.id_contract}`)
                            .join(", ")}`}
                        >
                          <Icon className="fa-info-circle" sx={{ color: "white" }}></Icon>
                        </MuiTooltip>
                      )}
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Button
                        fullWidth
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
                      {user.sales_third_party_selling.length > 0 && (
                        <MuiTooltip
                          title={`Ya has creado previamente una solicitud de venta para los contratos ${user.sales_third_party_selling
                            .map((sale) => `AV-${sale.id_contract}`)
                            .join(", ")}`}
                        >
                          <Icon className="fa-info-circle" sx={{ color: "white" }}></Icon>
                        </MuiTooltip>
                      )}
                    </Stack>
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

            <Grid display="flex" gap={2}>
              <LoadingButton fullWidth loading={loadingSubmit} variant="contained" size="large" onClick={() => setModal("modal-terms")}>
                Términos y Condiciones
              </LoadingButton>
            </Grid>
          </>
        ) : (
          <Grid display="flex" flexDirection="column" gap={2} width="100%">
            <Typography variant="h2" textAlign="center">
            ¡Bienvenido a la app de Avovite! 
            </Typography>
            <TermsAndConditions />
            <Grid display="flex" gap={2}>
              <LoadingButton fullWidth loading={loadingSubmit} variant="contained" size="large" onClick={() => handleAcceptTerms(false)}>
                Aceptar y Continuar
              </LoadingButton>
            </Grid>
          </Grid>
        )}
      </Container>
    </PageWrapper>
  );
}

export default Dashboard;
