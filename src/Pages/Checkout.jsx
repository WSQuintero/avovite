import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import useCart from "../Hooks/useCart";
import { formatCurrency } from "../utilities";
import { IMAGE_PLACEHOLDER } from "../utilities/constants";

function Checkout() {
  const [shoppingCart] = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
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
  const total = useMemo(() => subTotal * (1 - discount / 100), [subTotal, discount]);

  const validateCoupon = () => {
    if (coupon) {
      setDiscount(5);
    }
  };

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Grid component="ol" display="flex" flexDirection="column" gap={2}>
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography component="li" fontSize={24} fontWeight={600}>
              Método de pago
            </Typography>
            <Grid display="flex" flexDirection="column">
              <RadioGroup defaultValue="female" name="radio-buttons-group">
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" gap={2}>
                      <img
                        src="https://static-00.iconduck.com/assets.00/mastercard-icon-512x329-xpgofnyv.png"
                        alt=""
                        height={32}
                      />
                      <Grid display="flex" flexDirection="column">
                        <Typography>
                          MasterCard que termina en <b>7256</b>
                        </Typography>
                      </Grid>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" gap={2}>
                      <img
                        src="https://static-00.iconduck.com/assets.00/visa-icon-512x329-mpibmtt8.png"
                        alt=""
                        height={32}
                      />
                      <Grid display="flex" flexDirection="column">
                        <Typography>
                          Visa que termina en <b>1212</b>
                        </Typography>
                      </Grid>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" gap={2}>
                      <img
                        src="https://static-00.iconduck.com/assets.00/paypal-icon-512x322-gkyssz4h.png"
                        alt=""
                        height={32}
                      />
                      <Grid display="flex" flexDirection="column">
                        <Typography>Cuenta PayPal</Typography>
                      </Grid>
                    </Box>
                  }
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Divider />
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography component="li" fontSize={24} fontWeight={600}>
              Cupón de descuento
            </Typography>
            <Grid display="flex">
              <TextField
                label="Ingresa tu cupón aquí"
                value={coupon}
                onInput={({ target }) => setCoupon(target.value)}
                InputProps={{
                  endAdornment: (
                    <Button variant="contained" disabled={discount} onClick={validateCoupon}>
                      Aplicar
                    </Button>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography component="li" fontSize={24} fontWeight={600}>
              Revisar productos
            </Typography>
            <Grid display="flex" flexDirection="column">
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
                    width="10%"
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
                      ({element.quantity}) {element.package.quantity} {element.package.product_name}
                    </Typography>
                    <Typography color="primary">
                      Precio:{" "}
                      <Typography component="span" fontWeight={600} fontSize={22}>
                        {formatCurrency(
                          Math.round(
                            element.package.quantity *
                              element.package.unitary_price *
                              (1 - element.package.percent_discount / 100) *
                              element.quantity
                          ),
                          "$"
                        )}
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Divider />
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography component="li" fontSize={24} fontWeight={600}>
              Pago
            </Typography>
            <Grid
              display="flex"
              alignItems="center"
              gap={2}
              sx={(t) => ({
                [t.breakpoints.down("lg")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Button variant="contained">Pagar en COP</Button>
              <Grid display="flex" flexDirection="column" justifyContent="flex-end">
                <Typography fontSize={24} fontWeight={600} color="primary">
                  Pago Total: {formatCurrency(total, "$")}
                </Typography>
                {discount !== 0 && (
                  <Typography fontSize={18} fontWeight={600} color="primary" sx={{ textDecoration: "line-through" }}>
                    Pago Total: {formatCurrency(subTotal, "$")}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Checkout;
