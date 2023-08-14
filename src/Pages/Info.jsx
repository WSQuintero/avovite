import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import PageWrapper from "../Components/PageWrapper";
import CardMenu from "../Components/CardMenu";
import { useNavigate, useParams } from "react-router-dom";

const ResponsiveCard = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    sx={(t) => ({
      width: "calc(25% - 12px)",
      [t.breakpoints.down("xl")]: {
        width: "calc(50% - 8px)",
      },
      [t.breakpoints.down("md")]: {
        width: "100%",
      },
    })}
  >
    {children}
  </Box>
);

function Info() {
  const navigate = useNavigate();
  const { category } = useParams();

  return (
    <PageWrapper>
      <Container maxWidth={!category ? "xxl" : "md"}>
        {category === "terrain" ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h2" textAlign="center">
              Valoración de terrenos
            </Typography>
            <Typography textAlign="justify">
              Nuestro negocio cuenta con expertos en la valoración de terrenos de aguacates. Utilizamos criterios como
              la ubicación, el acceso a recursos hídricos, el estado del suelo, la topografía y la infraestructura
              existente para determinar el valor de los terrenos. Así podemos ofrecer precios justos y competitivos a
              los propietarios interesados en vender.
            </Typography>
          </Box>
        ) : category === "diversification" ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h2" textAlign="center">
              Potencial de diversificación
            </Typography>
            <Typography textAlign="justify">
              La compra de terrenos de aguacates puede ofrecer la oportunidad de diversificar las fuentes de ingresos.
              Además de la venta de la fruta en fresco, también es posible explorar otros mercados, como la producción
              de productos derivados del aguacate, como aceites, salsas o productos cosméticos.
            </Typography>
          </Box>
        ) : category === "inversion" ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h2" textAlign="center">
              Perspetiva de inversión
            </Typography>
            <Typography textAlign="justify">
              Si estás considerando vender tu terreno de aguacates, puedes aprovechar la oportunidad de obtener un
              retorno significativo de tu inversión. El creciente mercado de aguacates y la alta demanda tanto nacional
              como internacional hacen de esta venta una opción atractiva para quienes buscan maximizar su capital.
            </Typography>
          </Box>
        ) : category === "requirements" ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h2" textAlign="center">
              Requisitos de cultivos
            </Typography>
            <Typography textAlign="justify">
              El aguacate requiere ciertas condiciones climáticas y del suelo para crecer de manera óptima. Por lo
              general, prefiere climas cálidos o subtropicales y suelos bien drenados. Antes de adquirir un terreno, es
              importante evaluar si cumple con los requisitos necesarios para cultivar aguacates con éxito.
            </Typography>
          </Box>
        ) : (
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography variant="h2">Otros datos</Typography>
            <Grid display="flex" flexWrap="wrap" gap={2}>
              <ResponsiveCard>
                <CardMenu
                  title="Valoración de terrenos"
                  helperText="Nuestro negocio cuenta con expertos en la valoración de terrenos de aguacates."
                  icon={<ShoppingCartIcon />}
                  onClick={() => navigate("terrain")}
                />
              </ResponsiveCard>
              <ResponsiveCard>
                <CardMenu
                  title="Pontecial de diversificación "
                  helperText="La compra de terrenos de aguacates puede ofrecer la oportunidad de diversificar las fuentes."
                  icon={<ShoppingCartIcon />}
                  onClick={() => navigate("diversification")}
                />
              </ResponsiveCard>
              <ResponsiveCard>
                <CardMenu
                  title="Perpectivas de inversión"
                  helperText="Si estás considerando vender tu terreno de aguacates, puedes aprovechar la oportunidad."
                  icon={<ShoppingCartIcon />}
                  onClick={() => navigate("inversion")}
                />
                <Typography></Typography>
              </ResponsiveCard>
              <ResponsiveCard>
                <CardMenu
                  title="Requisitos de cultivo"
                  helperText="El aguacate requiere ciertas condiciones climáticas y del suelo."
                  icon={<ShoppingCartIcon />}
                  onClick={() => navigate("requirements")}
                />
              </ResponsiveCard>
            </Grid>
          </Grid>
        )}
      </Container>
    </PageWrapper>
  );
}

export default Info;
