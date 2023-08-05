import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Button, Typography, Card, CardActionArea, Container } from "@mui/material";
import { KeyboardBackspace as KeyboardBackspaceIcon, ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import useCart from "../Hooks/useCart";
import CardProduct from "../Components/CardProduct";
import PageWrapper from "../Components/PageWrapper";

const packages = [
  {
    id: 1,
    vites: 1,
    type: "simple",
    disccount: 5,
  },
  {
    id: 2,
    vites: 5,
    type: "standard",
    disccount: 5,
  },
  {
    id: 3,
    vites: 10,
    type: "exceptional",
    disccount: 5,
  },
  {
    id: 4,
    vites: 20,
    type: "amazing",
    disccount: 5,
  },
  {
    id: 5,
    vites: 37,
    type: "premium",
    disccount: 5,
  },
];

function Shop() {
  const [, { push }] = useCart();

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Grid
          display="flex"
          position="relative"
          flexWrap="wrap"
          gap={2}
          sx={(t) => ({ [t.breakpoints.down("md")]: { flexWrap: "nowrap", flexDirection: "column" } })}
        >
          {packages.map((product) => (
            <CardProduct
              key={product.id}
              product={product}
              sx={(t) => ({
                width: "calc(25% - 12px)",
                [t.breakpoints.down("xxl")]: {
                  width: "calc(50% - 8px)",
                },
                [t.breakpoints.down("lg")]: {
                  width: "100%",
                },
              })}
              onBuy={(product) => push(product)}
            />
          ))}
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Shop;
