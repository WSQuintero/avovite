import { Link as RouterLink } from "react-router-dom";
import { Box, Grid, Button, Typography, Link, Badge } from "@mui/material";
import { ShoppingCartOutlined as ShoppingCartIcon } from "@mui/icons-material";
import { PRODUCTS } from "../utilities/constants";
import PlantImage from "../assets/img/common/plant.png";
import PlantPremiumImage from "../assets/img/common/plant_premium.png";
import { NumericFormat } from "react-number-format";

function CardProduct({ product, sx, onBuy }) {
  const color = product.type === "premium" ? "premium.main" : "primary.main";
  const pack = PRODUCTS.find((p) => p.id === product.type);

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      border={1}
      borderRadius={2}
      borderColor="primary.main"
      padding={2}
      sx={sx}
    >
      <Box
        position="absolute"
        zIndex={1}
        right={8}
        top={8}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={48}
        height={48}
        borderRadius="50%"
        sx={{ backgroundColor: color, color: "white" }}
      >
        -{product.discount}%
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" gap={7} sx={{ aspectRatio: 2 }}>
        <img src={product.type === "premium" ? PlantPremiumImage : PlantImage} alt="logo" />
      </Box>
      <Grid display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1}>
        <Typography
          fontWeight={600}
          sx={{
            color,
          }}
        >
          {product.vites} Vites
        </Typography>
        <Typography>
          Paquete:{" "}
          <Typography component="span" color={color} fontWeight={600}>
            {pack.name}
          </Typography>
        </Typography>
        <Typography>
          Precio:{" "}
          <Typography component="span" color={color} fontWeight={600}>
            $
            <NumericFormat
              displayType="text"
              value={Math.round(product.vites * pack.value * (1 - product.discount / 100))}
              thousandSeparator
            ></NumericFormat>
          </Typography>
        </Typography>
        <Box height={8} />
        <Button
          variant="contained"
          color={product.type === "premium" ? "premium" : "primary"}
          fullWidth
          startIcon={<ShoppingCartIcon color="white" />}
          onClick={() => onBuy(product)}
        >
          Añadir al Carrito
        </Button>
        <Link component={RouterLink} color={color} to={`/package/${product.id}`} fontSize={12}>
          Producción del paquete
        </Link>
      </Grid>
    </Box>
  );
}

export default CardProduct;
