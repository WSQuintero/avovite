import { useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import { AddOutlined as AddIcon, RemoveOutlined as RemoveIcon, DeleteOutline as DeleteIcon } from "@mui/icons-material";
import { alpha, Box, Button, Container, Grid, IconButton, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useCart from "../Hooks/useCart";
import PageWrapper from "../Components/PageWrapper";
import { IMAGE_PLACEHOLDER } from "../utilities/constants";
import useSession from "../Hooks/useSession";
import DiscountService from "../Services/discount.service";
import PaymentService from "../Services/payment.service";
import Theme from "../Theme";

const APP_URL = import.meta.env.VITE_APP_URL;

function ShoppingCart() {
  const [{ token }] = useSession();
  const [shoppingCart, { remove, updateQuantity }] = useCart();
  const [discountCode, setDiscountCode] = useState({
    value: "",
    total: 0,
    id: null,
    isValid: false,
  });
  const [loadingDiscountCode, setLoadingDiscountCode] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const $Discount = useMemo(() => new DiscountService(token), [token]);
  const $Payment = useMemo(() => new PaymentService(token), [token]);
  const subTotal = useMemo(
    () =>
      shoppingCart.reduce(
        (a, c) => a + Math.round(c.package.quantity * c.package.unitary_price * (1 - c.package.percent_discount / 100) * c.quantity),
        0
      ),
    [shoppingCart]
  );
  const total = useMemo(() => subTotal * (1 - discountCode.total / 100), [subTotal, discountCode.total]);

  const handleDiscountCode = async () => {
    if (!discountCode.value) {
      return;
    }

    setLoadingDiscountCode(true);

    const { data, status } = await $Discount.get({ code: discountCode.value });

    setLoadingDiscountCode(false);

    if (status) {
      const discount = data.data.find((d) => d.name === discountCode.value.trim());

      if (discount) {
        setDiscountCode((prev) => ({
          ...prev,
          isValid: true,
          id: discount.id,
          total: discount.discountPercentage,
        }));
      }
    }
  };

  const handlePayment = async () => {
    if (!shoppingCart || !shoppingCart.length) {
      return;
    }

    setLoadingPayment(true);

    const { status } = await $Payment.validate({
      ...(discountCode.isValid ? { codeDiscount: discountCode.value } : {}),
      payments: shoppingCart.map((item) => ({
        ...item,
        total:
          Math.round(item.package.quantity * item.package.unitary_price * (1 - item.package.percent_discount / 100) * item.quantity) *
          (1 - discountCode.total / 100),
      })),
    });

    setLoadingPayment(false);

    if (status) {
      const name = shoppingCart.map((p) => `${p.package.quantity} ${p.package.product_name} (${p.package.discount_name})`).join(", ");

      const mandatory = {
        name,
        description: name,
        invoice: `AV-${uuid()}`,
        currency: "cop",
        amount: subTotal,
        tax_base: "4000",
        tax: "500",
        tax_ico: "500",
        country: "co",
        lang: "es",
      };

      const aditional = {
        extra1: JSON.stringify(shoppingCart.map((p) => ({ id_discount: p.package.id_discount, id_product: p.package.id_product }))),
        extra2: token,
        extra3: null,
        extra4: discountCode.isValid ? discountCode.id : null,
        confirmation: `${import.meta.env.VITE_API_URL}/contract-transactional-payments`,
        response: `${APP_URL}/checkout?products=${JSON.stringify(shoppingCart.map((p) => ({ id: p.id })))}`,
      };

      const handler = window.ePayco.checkout.configure({
        key: import.meta.env.VITE_EPAYCO_PUBLIC_KEY,
        // test: true,
      });

      handler.open({ ...mandatory, ...aditional });
    }
  };

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Grid display="flex" gap={2} flexDirection="column">
          <Grid display="flex" flexDirection="column" gap={4}>
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
                  bgcolor={alpha(Theme.palette.primary.main, 0.1)}
                  sx={(t) => ({
                    [t.breakpoints.down("xl")]: {
                      flexDirection: "column",
                    },
                  })}
                >
                  <Box
                    width={128}
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
                    gap={2}
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
                      <Box display="flex" alignItems="center" border={1} borderRadius={10} borderColor="primary.main">
                        <IconButton color="primary" size="small" onClick={() => updateQuantity("decrease", element.id)}>
                          <RemoveIcon />
                        </IconButton>
                        <Box display="flex" justifyContent="center" paddingX={0.5} color="primary.main" width={32}>
                          {element.quantity}
                        </Box>
                        <IconButton color="primary" size="small" onClick={() => updateQuantity("increase", element.id)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Typography color="primary">
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
              <Grid display="flex" gap={2}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Código de cupón"
                  value={discountCode.value}
                  onChange={({ target }) =>
                    setDiscountCode((prev) => ({
                      ...prev,
                      value: target.value,
                    }))
                  }
                />
                <LoadingButton loading={loadingDiscountCode} variant="contained" onClick={handleDiscountCode}>
                  Aplicar
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid display="flex" gap={2} flexDirection="column">
          <Grid display="flex" alignItems="flex-start">
            <Grid display="flex" flexDirection="column" gap={2} width="100%">
              <Box
                display="flex"
                flexDirection="column"
                mt={2}
                padding={2}
                borderRadius={1}
                bgcolor={alpha(Theme.palette.primary.main, 0.1)}
              >
                <Grid display="flex" justifyContent="space-between" alignItems="flex-end" height={33}>
                  <Typography color="primary" fontSize={16}>
                    Subtotal:
                  </Typography>
                  <Typography color="primary" fontWeight={600} fontSize={22}>
                    $
                    <NumericFormat displayType="text" value={subTotal} thousandSeparator disabled />
                  </Typography>
                </Grid>
                <Grid display="flex" justifyContent="space-between" alignItems="flex-end" height={33}>
                  <Typography color="primary" fontSize={16}>
                    Descuento:
                  </Typography>
                  <Typography color="primary" fontWeight={600} fontSize={22}>
                    {discountCode.total}%
                  </Typography>
                </Grid>
                {discountCode.isValid && (
                  <Grid display="flex" justifyContent="space-between" alignItems="flex-end" height={33}>
                    <Typography color="primary" fontSize={16}>
                      Cupón:
                    </Typography>
                    <Typography color="primary" fontWeight={600} fontSize={22}>
                      {discountCode.value.trim()}
                    </Typography>
                  </Grid>
                )}
                <Grid display="flex" justifyContent="space-between" alignItems="flex-end" height={33} mt={2}>
                  <Typography color="primary" fontWeight={600}>
                    Total:
                  </Typography>
                  <Typography color="primary" fontWeight={600} fontSize={22}>
                    $
                    <NumericFormat displayType="text" value={total} thousandSeparator disabled />
                  </Typography>
                </Grid>
              </Box>
              <LoadingButton loading={loadingPayment} variant="contained" onClick={handlePayment}>
                Proceder a pago
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default ShoppingCart;
