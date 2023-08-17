import { useEffect, useState } from "react";
import { Grid, Container, Skeleton } from "@mui/material";
import useCart from "../Hooks/useCart";
import useShop from "../Hooks/useShop";
import CardProduct from "../Components/CardProduct";
import PageWrapper from "../Components/PageWrapper";
import { PRODUCTS } from "../utilities/constants";

function Shop() {
  const [, { push }] = useCart();
  const $Shop = useShop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { status, data } = await $Shop.get();

    console.log(data.data)

    const parsedProducts = data.data.map((p) => ({
      id: p.idService,
      discount: p.percent_discount,
      vites: p.quantity_vites,
      type: PRODUCTS.find((p2) => p2.name === p.serviceName).id,
    }));

    if (status) {
      setProducts(parsedProducts);
    }
  };

  useEffect(() => {
    if ($Shop) {
      (async () => {
        await fetchProducts();
        setLoading(false);
      })();
    }
  }, [$Shop]);

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
          {loading
            ? [...Array(8).keys()].map((product) => (
                <Skeleton
                  key={product}
                  height={390}
                  sx={(t) => ({
                    width: "calc(25% - 12px)",
                    borderRadius: 2,
                    transform: "none",
                    [t.breakpoints.down("xxl")]: {
                      width: "calc(50% - 8px)",
                    },
                    [t.breakpoints.down("lg")]: {
                      width: "100%",
                    },
                  })}
                />
              ))
            : products.map((product) => (
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
