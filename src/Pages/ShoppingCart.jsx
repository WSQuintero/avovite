import React from "react";
import PageWrapper from "../Components/PageWrapper";
import { AddOutlined as AddIcon, RemoveOutlined as RemoveIcon, DeleteOutline as DeleteIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import useCart from "../Hooks/useCart";
import standardPlant from "../assets/img/products/plantaEstandar.svg";
import premiumPlant from "../assets/img/products/plantaPremium.svg";
import { PRODUCTS } from "../utilities/constants";
import { NumericFormat } from "react-number-format";

function ShoppingCart() {
  const [shoppingCart, { remove, updateQuantity }] = useCart();

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Grid display="flex" flexDirection="column" gap={4}>
          <Typography variant="h3">Carrito</Typography>
          <Grid display="flex" flexDirection="column">
            {(shoppingCart || []).map((element, index) => (
              <Grid
                key={index}
                display="flex"
                alignItems="center"
                gap={4}
                padding={1}
                borderRadius={2}
                sx={(t) => ({
                  transition: t.transitions.create(["background-color"], { duration: 200, easing: "ease-out" }),
                  "&:hover": {
                    backgroundColor: t.palette.grey[100],
                  },
                })}
              >
                <img src={element.package.type === "premium" ? premiumPlant : standardPlant} alt="plant logo" />
                <Grid display="flex" flexDirection="column" justifyContent="center">
                  <Typography fontSize={24} fontWeight={600}>
                    {element.package.vites} VITES
                  </Typography>
                  <Grid display="flex" alignItems="center" justifyContent="space-between" gap={12}>
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
                  <Typography color="primary">
                    Precio:{" "}
                    <Typography component="span" fontWeight={600}>
                      $
                      <NumericFormat
                        displayType="text"
                        value={
                          element.package.vites *
                          PRODUCTS.find((p) => p.id === element.package.type).value *
                          (1 - element.package.disccount / 100) *
                          element.quantity
                        }
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
          <Grid display="flex" gap={2}>
            <TextField label="Código de cupón" fullWidth />
            <Button>Aplicar</Button>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default ShoppingCart;
