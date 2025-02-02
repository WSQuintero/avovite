import { useEffect, useMemo, useState } from "react";
import { Grid, Container, Skeleton } from "@mui/material";
import useCart from "../Hooks/useCart";
import useShop from "../Hooks/useShop";
import useSession from "../Hooks/useSession";
import CardProduct from "../Components/CardProduct";
import PageWrapper from "../Components/PageWrapper";
import { useNavigate } from "react-router-dom";
import ShopService from "../Services/product.service";
import BackButton from "../Components/BackButton";

function Shop() {
  const navigate = useNavigate();

  const [{ user }] = useSession();
  const [, { push }] = useCart();
  // const $Shop = useShop();
  const [session] = useSession();
  const $Shop = useMemo(() => (session.token ? new ShopService(session.token) : null), [session.token]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { status, data } = await $Shop.shop.get();

    if (status) {
      setProducts(data.data);
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

  useEffect(() => {
    if (user) {
      if (user.status_terms_and_conditions == 0 || !user.status_terms_and_conditions_date) {
        navigate("/dashboard");
      }
    }
  }, [user]);

  return (
    <PageWrapper>
      <BackButton />
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
                  height={480}
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
                  key={product.id_product}
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
                  onBuy={(product) => {
                    push(product);
                    navigate("/cart");
                  }}
                />
              ))}
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Shop;
