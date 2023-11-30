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
  const [{ user }] = useSession();
  const [config, { setOnboarding }] = useConfig();
  const $Post = usePost();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState(2);
  const [modal, setModal] = useState("");

  const handleUpdateSellingMode = (mode) => {
    setModal("");
    setCurrentMode(
      {
        "request-avocados": 0,
        "sell-avocados-third-party": 1,
        "sell-avocados-avovite": 2,
      }[mode]
    );
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
                          {user.vites_balance}
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
                          {formatCurrency(5000000, "$") || 0}
                        </Typography>
                      </Stack>
                    </Stack>
                    <img
                      src={IconWhite}
                      alt="Icon white"
                      height={64}
                      style={{ position: "absolute", right: 16, bottom: 16 }}
                    />
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
                      variant="contained"
                      sx={{ justifyContent: "flex-start" }}
                      startIcon={<BrokenIcon color={Theme.palette.primary.main} />}
                      onClick={() => setModal("request-avocados")}
                    >
                      <Grow in={currentMode === 0}>
                        <Stack
                          position="absolute"
                          right={8}
                          width={32}
                          justifyContent="center"
                          alignItems="center"
                          height={32}
                          borderRadius={4}
                          bgcolor="secondary.main"
                        >
                          <Check />
                        </Stack>
                      </Grow>
                      <Typography textAlign="left" lineHeight={1} py={1} color="primary.main">
                        Solicitar mis frutos
                      </Typography>
                    </Button>
                    <Button
                      color="customWhite"
                      variant="contained"
                      sx={{ justifyContent: "flex-start" }}
                      startIcon={<TargetIcon color={Theme.palette.primary.main} />}
                      onClick={() => setModal("sell-avocados-third-party")}
                    >
                      <Grow in={currentMode === 1}>
                        <Stack
                          position="absolute"
                          right={8}
                          width={32}
                          justifyContent="center"
                          alignItems="center"
                          height={32}
                          borderRadius={4}
                          bgcolor="secondary.main"
                        >
                          <Check />
                        </Stack>
                      </Grow>
                      <Typography textAlign="left" lineHeight={1} py={1} color="primary.main">
                        Autorizo a vender mis frutos por un tercero
                      </Typography>
                    </Button>
                    <Button
                      color="customWhite"
                      variant="contained"
                      sx={{ justifyContent: "flex-start" }}
                      startIcon={<BriefcaseIcon color={Theme.palette.primary.main} />}
                      onClick={() => setModal("sell-avocados-avovite")}
                    >
                      <Grow in={currentMode === 2}>
                        <Stack
                          position="absolute"
                          right={8}
                          width={32}
                          justifyContent="center"
                          alignItems="center"
                          height={32}
                          borderRadius={4}
                          bgcolor="secondary.main"
                        >
                          <Check />
                        </Stack>
                      </Grow>
                      <Typography textAlign="left" lineHeight={1} py={1} color="primary.main">
                        Autorizo a Avovite vender mis frutos
                      </Typography>
                    </Button>
                  </Box>
                </Grid>
              </Stack>
              <Grid display="flex" flexDirection="column" gap={4}>
                <Typography variant="h2">Recientes</Typography>
                <Grid display="flex" flexDirection="column" gap={2}>
                  {loading
                    ? [...Array(3).keys()].map((post) => (
                        <Skeleton key={post} height={240} sx={{ transform: "none" }} />
                      ))
                    : posts.map((post) => <Post key={post.id} post={post} route={`/posts/${post.id}`} />)}
                </Grid>
              </Grid>
            </Grid>

            <DialogRequestAvocados
              open={modal === "request-avocados"}
              onClose={() => setModal("")}
              onSubmit={() => handleUpdateSellingMode("request-avocados")}
            />

            <Dialog fullWidth maxWidth="md" open={modal === "sell-avocados-third-party"} onClose={() => setModal("")}>
              <DialogTitle>Terminos y condiciones para venta de aguacates por terceros</DialogTitle>
              <DialogContent>
                <Stack spacing={2}>
                  <Stack>
                    <Typography fontWeight={600}>1. Registro como vendedor externo</Typography>
                    <Typography>
                      Las empresas interesadas en vender aguacates a través de nuestra plataforma deben registrarse como
                      vendedores externos. Este registro implica proporcionar información detallada y precisa sobre la
                      empresa, la calidad de los aguacates ofrecidos, los detalles de contacto y los métodos de envío.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>2. Calidad de los aguacates</Typography>
                    <Typography>
                      Las empresas vendedoras externas se comprometen a ofrecer aguacates de alta calidad y frescura a
                      los usuarios de la plataforma. Asimismo, se espera que proporcionen descripciones precisas y
                      verídicas de los productos ofrecidos, incluyendo su estado, tamaño, calidad y cualquier otra
                      característica relevante.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>3. Responsabilidades del vendedor externo</Typography>
                    <Typography>
                      Las empresas vendedoras externas son responsables de garantizar la precisión de la información
                      sobre precios, métodos de envío, plazos de entrega y políticas de devolución. Además, deben
                      cumplir con todas las leyes y regulaciones aplicables relacionadas con la venta de productos
                      agrícolas.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>4. Comisiones y pagos</Typography>
                    <Typography>
                      Se pueden aplicar comisiones por las ventas realizadas a través de la plataforma. Los detalles
                      sobre las tarifas y los métodos de pago se especificarán en un acuerdo separado entre la
                      plataforma y la empresa vendedora externa.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>5. Envío y entregas</Typography>
                    <Typography>
                      Las empresas vendedoras externas son responsables de la correcta preparación y envío de los
                      aguacates vendidos a través de la plataforma. Los costos de envío y cualquier problema relacionado
                      con la entrega serán responsabilidad de la empresa vendedora externa, a menos que se acuerde lo
                      contrario con los compradores.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>6. Cancelaciones y devoluciones</Typography>
                    <Typography>
                      Las empresas vendedoras externas deben establecer claramente sus políticas de cancelación,
                      devolución y reembolso. Las disputas entre vendedores externos y compradores se resolverán de
                      manera independiente, aunque la plataforma puede intervenir según sea necesario para facilitar una
                      solución.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>7. Modificaciones en los términos y condiciones</Typography>
                    <Typography>
                      La plataforma se reserva el derecho de realizar cambios en estos términos y condiciones en
                      cualquier momento sin previo aviso. Se recomienda a las empresas vendedoras externas revisar
                      periódicamente esta sección para estar al tanto de cualquier actualización.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography>
                      Al utilizar esta plataforma para vender aguacates, las empresas vendedoras externas aceptan y
                      comprenden estos términos y condiciones en su totalidad.
                    </Typography>
                  </Stack>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setModal("")}>
                  Cancelar
                </Button>
                <Button variant="contained" onClick={() => handleUpdateSellingMode("sell-avocados-third-party")}>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog fullWidth maxWidth="md" open={modal === "sell-avocados-avovite"} onClose={() => setModal("")}>
              <DialogTitle>Terminos y condiciones para venta de aguacates por Avovite</DialogTitle>
              <DialogContent>
                <Stack spacing={2}>
                  <Stack>
                    <Typography fontWeight={600}>1. Objeto</Typography>
                    <Typography>
                      Al utilizar nuestra plataforma para adquirir aguacates, aceptas cumplir con los siguientes
                      términos y condiciones. Si no estás de acuerdo con alguno de estos términos, te pedimos que no
                      utilices esta plataforma para la compra de aguacates.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>2. Oferta de aguacates</Typography>
                    <Typography>
                      &quot;Avovite&quot; ofrece aguacates a través de esta plataforma para su compra por parte de los
                      usuarios interesados. Los detalles sobre la cantidad, calidad, precio y cualquier información
                      adicional sobre los aguacates ofrecidos se especificarán en la plataforma y estarán sujetos a
                      disponibilidad.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>3. Proceso de producción</Typography>
                    <Typography>
                      &quot;Avovite&quot; es responsable del cultivo, cosecha y preparación de los aguacates ofrecidos
                      en su plataforma de inversión. Se esfuerza por mantener altos estándares de calidad y frescura en
                      todos sus productos.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>4. Costos y pagos</Typography>
                    <Typography>
                      Los usuarios son responsables de pagar el precio establecido por &quot;Avovite&quot; por los
                      aguacates adquiridos. Los detalles sobre los métodos de pago y los costos de envío, si aplican, se
                      especificarán en la plataforma al momento de la compra.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>5. Envío y entregas</Typography>
                    <Typography>
                      &quot;Avovite&quot; se compromete a realizar los envíos de los aguacates adquiridos en el menor
                      tiempo posible y siguiendo los estándares de envío acordados. Los costos de envío serán
                      responsabilidad del usuario, a menos que se acuerde lo contrario.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>6. Calidad y garantía</Typography>
                    <Typography>
                      &quot;Avovite&quot; se esfuerza por ofrecer aguacates de la mejor calidad posible. La empresa
                      garantiza la frescura de los productos ofrecidos y se compromete a solucionar cualquier problema
                      relacionado con la calidad de los aguacates entregados.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>7. Cancelaciones y devoluciones</Typography>
                    <Typography>
                      Las políticas de cancelación, devolución y reembolso estarán sujetas a las disposiciones
                      establecidas por &quot;Avovite&quot; y se especificarán claramente en la plataforma al momento de
                      la compra.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography fontWeight={600}>8. Modificaciones en los términos y condiciones</Typography>
                    <Typography>
                      &quot;Avovite&quot; se reserva el derecho de realizar cambios en estos términos y condiciones en
                      cualquier momento sin previo aviso. Se recomienda a los usuarios revisar periódicamente esta
                      sección para estar al tanto de cualquier actualización.
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography>
                      Al utilizar esta plataforma para adquirir aguacates de &quot;Avovite&quot;, los usuarios aceptan y
                      comprenden estos términos y condiciones en su totalidad.
                    </Typography>
                  </Stack>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={() => setModal("")}>
                  Cancelar
                </Button>
                <Button variant="contained" onClick={() => handleUpdateSellingMode("sell-avocados-avovite")}>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
          </>
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
