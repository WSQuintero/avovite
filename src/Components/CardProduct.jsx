import { Link as RouterLink } from "react-router-dom";
import { Box, Grid, Button, Typography, Link, alpha } from "@mui/material";
import { ShoppingCartOutlined as ShoppingCartIcon } from "@mui/icons-material";

import { NumericFormat } from "react-number-format";
import { IMAGE_PLACEHOLDER } from "../utilities/constants";
import Theme from "../Theme";

function CardProduct({ product, sx, onBuy }) {
  const color = product.discount_name === "PACK STANDARD" ? "primary.main" : "premium.main";

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      borderRadius={2}
      padding={2}
      bgcolor={alpha(Theme.palette.primary.main, 0.1)}
      sx={sx}
    >
      {product.percent_discount > 0 && (
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
          -{product.percent_discount}%
        </Box>
      )}
      <Box display="flex" justifyContent="center" alignItems="center" gap={7} width="100%">
        <img src={product.url_image || IMAGE_PLACEHOLDER} alt="logo" style={{ width: "100%", aspectRatio: 1, objectFit: "contain" }} />
      </Box>
      <Grid display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1}>
        <Typography fontWeight={600} sx={{ color }}>
          {product.quantity}Vite{product.quantity > 1 ? "s" : ""}
        </Typography>
        <Typography color={color} fontWeight={600}>
          {product.product_name}
        </Typography>
        {/* <Typography>
          Paquete:{" "}
          <Typography component="span" color={color} fontWeight={600}>
            {product.discount_name}
          </Typography>
        </Typography> */}
        <Typography>
          Precio:{" "}
          <Typography component="span" color={color} fontWeight={600}>
            $
            <NumericFormat
              displayType="text"
              value={Math.round(product.quantity * product.unitary_price * (1 - product.percent_discount / 100))}
              thousandSeparator
            ></NumericFormat>
          </Typography>
        </Typography>
        <Box height={8} />
        <Button
          variant="contained"
          color={product.discount_name === "PACK STANDARD" ? "primary" : "premium"}
          fullWidth
          startIcon={<ShoppingCartIcon color="white" />}
          onClick={() => onBuy(product)}
        >
          Añadir al Carrito
        </Button>
        <Link component={RouterLink} color={color} to={`/production/${product.id_product}`} fontSize={12}>
          Producción del paquete
        </Link>
      </Grid>
    </Box>
  );
}

export default CardProduct;
