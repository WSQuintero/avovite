import { useMemo, useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import { AddOutlined as AddIcon, RemoveOutlined as RemoveIcon, DeleteOutline as DeleteIcon } from "@mui/icons-material";
import {
  alpha,
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Collapse,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useCart from "../Hooks/useCart";
import PageWrapper from "../Components/PageWrapper";
import { IMAGE_PLACEHOLDER, TESTING_EPAYCO } from "../utilities/constants";
import useSession from "../Hooks/useSession";
import DiscountService from "../Services/discount.service";
import PaymentService from "../Services/payment.service";
import Theme from "../Theme";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import ModalConfirmationPay from "../Components/Admin/ModalConfirmationPay";
import BackButton from "../Components/BackButton";

const APP_URL = import.meta.env.VITE_APP_URL;

function ShoppingCart() {
  const navigate = useNavigate();

  const [session] = useSession();

  const { enqueueSnackbar } = useSnackbar();
  const [{ token }] = useSession();
  const [shoppingCart, { remove, updateQuantity }] = useCart();
  const [discountCode, setDiscountCode] = useState({
    value: "",
    total: 0,
    id: null,
    isValid: false,
  });
  const [product, setProduct] = useState(null);
  const [loadingDiscountCode, setLoadingDiscountCode] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const $Discount = useMemo(() => new DiscountService(token), [token]);
  const $Payment = useMemo(() => new PaymentService(token), [token]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const selectedProduct = useMemo(() => shoppingCart.find((p) => p.id === product), [shoppingCart, product]);
  const subTotal = useMemo(
    () =>
      selectedProduct
        ? Math.round(
            selectedProduct.package.quantity *
              selectedProduct.package.unitary_price *
              (1 - selectedProduct.package.percent_discount / 100) *
              selectedProduct.quantity
          )
        : 0,
    [selectedProduct]
  );
  const total = useMemo(
    () => subTotal * (selectedProduct?.package.percent_discount <= discountCode.total ? 1 - discountCode.total / 100 : 1),
    [subTotal, selectedProduct?.package.percent_discount, discountCode.total]
  );

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
    setOpenConfirmationModal(false);
    if (!shoppingCart || !shoppingCart.length || !product) {
      return;
    }

    setLoadingPayment(true);

    const { status, data } = await $Payment.validate({
      ...(discountCode.isValid ? { codeDiscount: discountCode.value } : {}),
      payments: [{ ...selectedProduct, total }],
    });

    setLoadingPayment(false);

    if (status) {
      const name = `${selectedProduct.package.quantity} ${selectedProduct.package.product_name} (×${selectedProduct.quantity})`;

      const mandatory = {
        name,
        description: name,
        invoice: `AV-${uuid()}`,
        currency: "cop",
        amount: total,
        tax_base: "4000",
        tax: "500",
        tax_ico: "500",
        country: "co",
        lang: "es",
      };

      const aditional = {
        extra1: JSON.stringify([
          {
            id_discount: selectedProduct.package.id_discount,
            id_product: selectedProduct.package.id_product,
            quantity: selectedProduct.quantity,
          },
        ]),
        extra2: token,
        extra3: null,
        extra4: discountCode.isValid ? JSON.stringify(discountCode) : null,
        confirmation: `${import.meta.env.VITE_API_URL}/contract-transactional-payments`,
        response: `${APP_URL}/checkout?products=${JSON.stringify(shoppingCart.map((p) => ({ id: p.id })))}`,
      };

      const handler = window.ePayco.checkout.configure({
        key: import.meta.env.VITE_EPAYCO_PUBLIC_KEY,
        test: TESTING_EPAYCO,
      });

      handler.open({ ...mandatory, ...aditional });
    } else {
      enqueueSnackbar(data.response.data.message, { variant: "error", autoHideDuration: 10000 });
    }
  };

  useEffect(() => {
    if (session?.user) {
      if (session?.user.status_terms_and_conditions == 0 || !session.user.status_terms_and_conditions_date) {
        navigate("/dashboard");
      }
    }
  }, [session.user]);

  useEffect(() => {
    if (shoppingCart?.length > 0 && !product) {
      setProduct(shoppingCart[0]?.id);
    }
  }, [shoppingCart, product]);

  return (
    <PageWrapper>
      <BackButton />
      <Container maxWidth="xxl">
        <Grid display="flex" gap={2} flexDirection="column">
          <Grid display="flex" flexDirection="column" gap={4}>
            <Typography variant="h3">Carrito</Typography>
            <Grid display="flex" flexDirection="column" gap={2}>
              <FormControl>
                <RadioGroup
                  value={product}
                  sx={{ gap: 2 }}
                  onChange={(e) => {
                    setProduct(e.target.value);
                  }}
                >
                  {shoppingCart?.map((element, index) => (
                    <FormControlLabel
                      key={index}
                      value={element.id}
                      control={<Radio />}
                      slotProps={{ typography: { width: "100%" } }}
                      label={
                        <Grid
                          className={product === element.id ? "active" : ""}
                          position="relative"
                          display="flex"
                          alignItems="center"
                          gap={4}
                          paddingY={1}
                          paddingX={2}
                          borderRadius={2}
                          sx={(t) => ({
                            transition: t.transitions.create(["background-color"]),
                            "&:hover": {
                              backgroundColor: "action.hover",
                            },
                            "&.active": {
                              backgroundColor: alpha(t.palette.primary.main, 0.1),
                            },
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
                          {element.package.percent_discount > 0 && (
                            <Box
                              position="absolute"
                              zIndex={1}
                              bottom={8}
                              left={8}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              width={32}
                              height={32}
                              borderRadius={2}
                              bgcolor="primary.main"
                            >
                              <Typography fontSize={12} fontWeight={500} color="white">
                                -{element?.package.percent_discount}%
                              </Typography>
                            </Box>
                          )}

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
                            <Grid display="flex" alignItems="center" gap={2}>
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
                            <Stack direction="row" spacing={1} alignItems="center" color="primary.main">
                              Precio:
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
                              {element.package.percent_discount > 0 && (
                                <Typography component="span" fontWeight={600} fontSize={16} sx={{ textDecoration: "line-through" }}>
                                  $
                                  <NumericFormat
                                    displayType="text"
                                    value={Math.round(element.package.quantity * element.package.unitary_price * element.quantity)}
                                    thousandSeparator
                                    disabled
                                  />
                                </Typography>
                              )}
                            </Stack>
                          </Grid>
                          <Grid marginLeft="auto">
                            <IconButton
                              color="error"
                              onClick={() => {
                                remove(element.id);
                                if (product === element.id) {
                                  setProduct(null);
                                }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid display="flex" gap={2} mx={4}>
              <TextField
                fullWidth
                disabled={discountCode.isValid}
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
              <LoadingButton loading={loadingDiscountCode} disabled={discountCode.isValid} variant="contained" onClick={handleDiscountCode}>
                Aplicar
              </LoadingButton>
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
                  <Typography color="primary" fontSize={18}>
                    $
                    <NumericFormat displayType="text" value={subTotal} thousandSeparator disabled />
                  </Typography>
                </Grid>
                <Grid display="flex" justifyContent="space-between" alignItems="flex-end" height={33}>
                  <Typography color="primary" fontSize={16}>
                    Descuento:
                  </Typography>
                  <Typography color="primary" fontSize={18}>
                    {selectedProduct?.package.percent_discount > discountCode.total
                      ? selectedProduct?.package.percent_discount
                      : discountCode.total}
                    %
                  </Typography>
                </Grid>
                <Collapse in={discountCode.isValid && selectedProduct?.package.percent_discount <= discountCode.total}>
                  <Grid display="flex" justifyContent="space-between" alignItems="flex-end" height={33}>
                    <Typography color="primary" fontSize={16}>
                      Cupón:
                    </Typography>
                    <Typography color="primary" fontSize={18}>
                      {discountCode.value.trim()}
                    </Typography>
                  </Grid>
                </Collapse>
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
              <Collapse in={discountCode.isValid && selectedProduct?.package.percent_discount > discountCode.total}>
                <Alert severity="warning" sx={{ "& .MuiAlert-icon": { alignSelf: "center" } }}>
                  Dado que has seleccionado un artículo con un descuento y has introducido un código de cupón, se aplicará solo el descuento
                  de mayor valor.
                </Alert>
              </Collapse>
              <LoadingButton
                loading={loadingPayment}
                variant="contained"
                onClick={() => setOpenConfirmationModal(true)}
                disabled={session?.user?.rejectedCounter.length === 2 || !product}
              >
                {product ? "Proceder a pago" : "Seleccione un producto para realizar el pago"}
              </LoadingButton>
            </Grid>
            <ModalConfirmationPay open={openConfirmationModal} handlePayment={handlePayment} />
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default ShoppingCart;
