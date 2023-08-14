import { useNavigate, useOutlet, useParams } from "react-router-dom";
import { Box, Grid, Button, Typography, Avatar, Container } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
// import WalletInformation from "../Components/WalletInformation";
import useSession from "../Hooks/useSession";
import PageWrapper from "../Components/PageWrapper";
import CardMenu from "../Components/CardMenu";

import background from "../assets/img/wallet/background.png";

function Wallet() {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const { bank } = useParams();
  const [{ user }] = useSession();

  if (!user) {
    return <></>;
  }

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Grid display="flex" flexDirection="column" gap={4}>
          {!bank && (
            <>
              <Typography
                variant="h2"
                sx={(t) => ({
                  [t.breakpoints.down("md")]: {
                    display: "none",
                  },
                })}
              >
                Billetera
              </Typography>
              <Box
                sx={(t) => ({
                  [t.breakpoints.up("md")]: {
                    display: "none",
                  },
                })}
              >
                <img
                  src={background}
                  alt="background"
                  style={{ position: "absolute", zIndex: -1, top: 56, left: 0, right: 0, width: "100%" }}
                />
              </Box>
              <Grid
                display="flex"
                alignItems="center"
                gap={2}
                color="primary.main"
                sx={(t) => ({
                  [t.breakpoints.down("md")]: {
                    justifyContent: "space-between",
                    color: "white",
                  },
                })}
              >
                <Avatar src={user.avatar} alt={user.name} sx={{ width: 120, height: 120 }} />
                <Grid display="flex" flexDirection="column">
                  <Typography>Tu Dinero</Typography>
                  <Typography fontSize={20} fontWeight={600}>
                    $ 5,000,000
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
          {outlet || (
            <Grid display="flex" flexWrap="wrap" gap={2}>
              <Box
                sx={(t) => ({
                  width: "calc(25% - 12px)",
                  [t.breakpoints.down("lg")]: {
                    width: "calc(50% - 8px)",
                  },
                  [t.breakpoints.down("md")]: {
                    width: "100%",
                  },
                })}
              >
                <CardMenu title="Pasar dinero" icon={<ShoppingCartIcon />} onClick={() => navigate("transfer")} />
              </Box>
              <Box
                sx={(t) => ({
                  width: "calc(25% - 12px)",
                  [t.breakpoints.down("lg")]: {
                    width: "calc(50% - 8px)",
                  },
                  [t.breakpoints.down("md")]: {
                    width: "100%",
                  },
                })}
              >
                <CardMenu title="Transaciones" icon={<ShoppingCartIcon />} />
              </Box>
              <Box
                sx={(t) => ({
                  width: "calc(25% - 12px)",
                  [t.breakpoints.down("lg")]: {
                    width: "calc(50% - 8px)",
                  },
                  [t.breakpoints.down("md")]: {
                    width: "100%",
                  },
                })}
              >
                <CardMenu title="Comprar VITES" icon={<ShoppingCartIcon />} />
              </Box>
              <Box
                sx={(t) => ({
                  width: "calc(25% - 12px)",
                  [t.breakpoints.down("lg")]: {
                    width: "calc(50% - 8px)",
                  },
                  [t.breakpoints.down("md")]: {
                    width: "100%",
                  },
                })}
              >
                <CardMenu title="Hablar con asesor" icon={<ShoppingCartIcon />} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Wallet;
