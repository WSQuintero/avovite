import { useMemo } from "react";
import { NumericFormat } from "react-number-format";
import { AddOutlined as AddIcon, RemoveOutlined as RemoveIcon, DeleteOutline as DeleteIcon } from "@mui/icons-material";
import { alpha, Box, Button, Container, Grid, IconButton, TextField, Typography, Divider } from "@mui/material";
import useCart from "../Hooks/useCart";
import PageWrapper from "../Components/PageWrapper";
import { IMAGE_PLACEHOLDER, PRODUCTS } from "../utilities/constants";

import PlantImage from "../assets/img/common/plant.png";
import PlantPremiumImage from "../assets/img/common/plant_premium.png";

function ShoppingCart() {
  const [shoppingCart, { remove, updateQuantity }] = useCart();
  const subTotal = useMemo(
    () =>
      shoppingCart.reduce(
        (a, c) =>
          a +
          Math.round(
            c.package.quantity * c.package.unitary_price * (1 - c.package.percent_discount / 100) * c.quantity
          ),
        0
      ),
    [shoppingCart]
  );

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Grid
          display="flex"
          gap={2}
          flexDirection="row"
          sx={(t) => ({
            [t.breakpoints.down("xl")]: {
              flexDirection: "column",
            },
          })}
        >
          <Grid
            display="flex"
            flexDirection="column"
            gap={4}
            width="75%"
            sx={(t) => ({
              [t.breakpoints.down("xl")]: {
                width: "100%",
              },
            })}
          >
            <Typography variant="h3">Carrito</Typography>
            <Grid display="flex" flexDirection="column" gap={2}>
              {shoppingCart.map((element, index) => (
                <Grid
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap={4}
                  paddingY={1}
                  paddingX={2}
                  borderRadius={2}
                  sx={(t) => ({
                    transition: t.transitions.create(["background-color"], { duration: 200, easing: "ease-out" }),
                    "&:hover": {
                      backgroundColor: t.palette.grey[100],
                    },
                    [t.breakpoints.down("xl")]: {
                      flexDirection: "column",
                      border: 1,
                      borderColor: "primary.main",
                    },
                  })}
                >
                  <Box
                    width="25%"
                    sx={(t) => ({
                      [t.breakpoints.down("xl")]: {
                        width: "100%",
                      },
                    })}
                  >
                    <img src={element.package.url_image || IMAGE_PLACEHOLDER} alt="plant logo" width="100%" />
                  </Box>

                  <Grid
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    sx={(t) => ({
                      [t.breakpoints.down("xl")]: {
                        alignItems: "center",
                      },
                    })}
                  >
                    <Typography fontSize={24} fontWeight={600}>
                      {element.package.quantity} {element.package.product_name}
                    </Typography>
                    <Grid display="flex" alignItems="center" justifyContent="space-between" gap={4}>
                      <Typography>Cantidad:</Typography>
                      <Box display="flex" border={1} borderRadius={10} borderColor="primary.main">
                        <IconButton color="primary" onClick={() => updateQuantity("decrease", element.id)}>
                          <RemoveIcon />
                        </IconButton>
                        <Box paddingX={2} paddingY={1} color="primary.main">
                          {element.quantity}
                        </Box>
                        <IconButton color="primary" onClick={() => updateQuantity("increase", element.id)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Typography color="primary" marginTop={4}>
                      Precio:{" "}
                      <Typography component="span" fontWeight={600} fontSize={22}>
                        $
                        <NumericFormat
                          displayType="text"
                          value={Math.round(
                            element.package.quantity *
                              element.package.unitary_price *
                              (1 - element.package.percent_discount / 100) *
                              element.quantity
                          )}
                          thousandSeparator
                          disabled
                        />
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid marginLeft="auto">
                    <IconButton color="error" onClick={() => remove(element.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            display="flex"
            alignItems="flex-start"
            width="25%"
            sx={(t) => ({
              [t.breakpoints.down("xl")]: {
                width: "100%",
              },
            })}
          >
            <Grid position="sticky" top={32} display="flex" flexDirection="column" gap={2} width="100%">
              <Box
                display="flex"
                flexDirection="column"
                padding={2}
                borderRadius={1}
                sx={(t) => ({ backgroundColor: alpha(t.palette.primary.main, 0.1) })}
              >
                <Grid display="flex" justifyContent="space-between" alignItems="flex-end">
                  <Typography color="primary">Subtotal:</Typography>
                  <Typography color="primary" fontWeight={600} fontSize={22}>
                    $
                    <NumericFormat displayType="text" value={subTotal} thousandSeparator disabled />
                  </Typography>
                </Grid>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap={4}
                padding={2}
                borderRadius={1}
                sx={(t) => ({ backgroundColor: alpha(t.palette.primary.main, 0.1) })}
              >
                <Grid display="flex" flexDirection="column" gap={2}>
                  <TextField label="Código de cupón" InputProps={{ sx: { backgroundColor: "white" } }} fullWidth />
                </Grid>
              </Box>
              <Button variant="contained">Proceder a pago</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default ShoppingCart;
