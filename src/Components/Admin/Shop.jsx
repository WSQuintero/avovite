import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import useShop from "../../Hooks/useShop";
import EnhancedTable from "../EnhancedTable";
import TabPanel from "../TabPanel";
import { formatCurrency } from "../../utilities";
import { IMAGE_PLACEHOLDER } from "../../utilities/constants";
import { NumericFormat } from "react-number-format";
import { MuiFileInput } from "mui-file-input";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import ProductionService from "../../Services/production.service";

function Products({ service: $Shop, state, feedback }) {
  const [products, setProducts] = state;
  const [, setFeedback] = feedback;
  const [product, setProduct] = useState({ id: null, name: "", unitary_price: "", url_image: "" });
  const [modal, setModal] = useState(null);
  const isValidProduct = useMemo(() => product.name && product.unitary_price && product.url_image, [product]);

  const productsHeadCells = useMemo(
    () => [
      {
        id: "url_image",
        label: "Imagen",
        align: "left",
        disablePadding: false,
        width: 240,
        format: (value) => (
          <Box display="flex" width="100%" sx={{ aspectRatio: 1 }}>
            <img
              src={value || IMAGE_PLACEHOLDER}
              width="100%"
              style={{ objectFit: value ? "cover" : "contain", borderRadius: 8 }}
              alt="product image"
            />
          </Box>
        ),
      },
      {
        id: "name",
        label: "Nombre",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "unitary_price",
        label: "Precio unitario",
        align: "left",
        disablePadding: false,
        format: (value) => formatCurrency(value, "$"),
      },
      {
        id: "",
        label: "",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Grid display="flex" justifyContent="flex-end" gap={1}>
            <IconButton
              onClick={() => {
                setProduct({ id: row.id, name: row.name, unitary_price: row.unitary_price, url_image: row.url_image });
                setModal("update");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setProduct({ id: row.id, name: row.name, unitary_price: row.unitary_price, url_image: row.url_image });
                setModal("delete");
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ),
      },
    ],
    []
  );

  const onChangeFields = ({ target }) => {
    const { name, value } = target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onClearFields = () => {
    setModal(null);
    setProduct({ id: null, name: "", unitary_price: "" });
  };

  const onCreateProduct = async (event) => {
    event.preventDefault();

    if (!isValidProduct) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status, data } = await $Shop.product.add(product);

    if (status) {
      setProducts((prev) => [...prev, { ...product, id: data.data, url_image: URL.createObjectURL(product.url_image) }]);
      setFeedback({ open: true, message: "Producto creado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onUpdateProduct = async (event) => {
    event.preventDefault();

    if (!isValidProduct) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status } = await $Shop.product.update(product);

    if (status) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
      setFeedback({ open: true, message: "Producto actualizado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onDeleteProduct = async () => {
    const { status } = await $Shop.product.delete(product);

    if (status) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      setFeedback({ open: true, message: "Producto eliminado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  return (
    <>
      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid display="flex" gap={1} justifyContent="flex-end">
          <Button variant="contained" size="small" onClick={() => setModal("create")}>
            Crear
          </Button>
        </Grid>
        <EnhancedTable headCells={productsHeadCells} rows={products} />
      </Grid>

      <Dialog open={modal === "create" || modal === "update"} onClose={onClearFields} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">{modal === "create" ? "Crear" : "Editar"} producto</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={1}
            onSubmit={modal === "create" ? onCreateProduct : onUpdateProduct}
          >
            <Grid display="flex" flexDirection="column" gap={2}>
              <Grid display="flex" gap={2}>
                <TextField label="Nombre" name="name" value={product.name} onChange={onChangeFields} fullWidth />
                <NumericFormat
                  customInput={TextField}
                  label="Precio unitario"
                  variant="outlined"
                  value={product.unitary_price}
                  sx={{ width: "100%" }}
                  thousandSeparator
                  onValueChange={({ floatValue }) =>
                    setProduct((prev) => ({
                      ...prev,
                      unitary_price: floatValue,
                    }))
                  }
                />
              </Grid>
              <Grid display="flex" gap={2}>
                <MuiFileInput
                  fullWidth
                  label="Imagen"
                  value={product.url_image}
                  onChange={(value) => onChangeFields({ target: { name: "url_image", value } })}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClearFields}>Cancelar</Button>
            <Button onClick={modal === "create" ? onCreateProduct : onUpdateProduct} variant="contained" disabled={!isValidProduct}>
              {modal === "create" ? "Crear" : "Editar"}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={modal === "delete"} onClose={onClearFields} fullWidth>
        <DialogTitle>Eliminar producto</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar este producto?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClearFields}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onDeleteProduct}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
function Discounts({ service: $Shop, state, products, feedback }) {
  const [discounts, setDiscounts] = state;
  const [, setFeedback] = feedback;
  const [discount, setDiscount] = useState({
    id: null,
    id_product: null,
    name: "-",
    quantity: "",
    percent_discount: "",
    // production_in_kilograms: "",
    // tir: "",
    url_image: "",
  });
  const [modal, setModal] = useState(null);
  const isValidProduct = useMemo(
    () =>
      discount.name !== "-" &&
      discount.quantity &&
      discount.percent_discount !== "" &&
      // discount.production_in_kilograms &&
      // discount.tir &&
      discount.url_image &&
      discount.id_product,
    [discount]
  );

  const discountsHeadCells = useMemo(
    () => [
      {
        id: "url_image",
        label: "Imagen",
        align: "left",
        disablePadding: false,
        width: 240,
        format: (value) => (
          <Box display="flex" width="100%" sx={{ aspectRatio: 1 }}>
            <img
              src={value || IMAGE_PLACEHOLDER}
              width="100%"
              style={{ objectFit: value ? "cover" : "contain", borderRadius: 8 }}
              alt="product image"
            />
          </Box>
        ),
      },
      {
        id: "name",
        label: "Nombre",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "percent_discount",
        label: "% Descuento",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "quantity",
        label: "Cantidad",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      // {
      //   id: "tir",
      //   label: "Tir",
      //   align: "left",
      //   disablePadding: false,
      //   format: (value) => value || "-",
      // },
      // {
      //   id: "production_in_kilograms",
      //   label: "Producción en kg",
      //   align: "left",
      //   disablePadding: false,
      //   format: (value) => value || "-",
      // },
      {
        id: "",
        label: "",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Grid display="flex" justifyContent="flex-end" gap={1}>
            <IconButton
              onClick={() => {
                setDiscount({
                  id: row.id,
                  id_product: row.id_product,
                  name: row.name,
                  percent_discount: row.percent_discount,
                  quantity: row.quantity,
                  url_image: row.url_image,
                });
                setModal("update");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setDiscount({
                  id: row.id,
                  id_product: row.id_product,
                  name: row.name,
                  percent_discount: row.percent_discount,
                  quantity: row.quantity,
                  url_image: row.url_image,
                });
                setModal("delete");
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ),
      },
    ],
    []
  );

  const onChangeFields = ({ target }) => {
    const { name, value } = target;
    setDiscount((prev) => ({ ...prev, [name]: value }));
  };

  const onClearFields = () => {
    setModal(null);
    setDiscount({
      id: null,
      id_product: null,
      name: "-",
      quantity: "",
      percent_discount: "",
      // production_in_kilograms: "",
      // tir: "",
      url_image: "",
    });
  };

  const onCreateDiscount = async (event) => {
    event.preventDefault();

    if (!isValidProduct) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status, data } = await $Shop.discount.add(discount);

    if (status) {
      setDiscounts((prev) => [...prev, { ...discount, id: data.data, url_image: URL.createObjectURL(discount.url_image) }]);
      setFeedback({ open: true, message: "Descuento creado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onUpdateDiscount = async (event) => {
    event.preventDefault();

    if (!isValidProduct) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status } = await $Shop.discount.update(discount);

    if (status) {
      setDiscounts((prev) => prev.map((p) => (p.id === discount.id ? discount : p)));
      setFeedback({ open: true, message: "Descuento actualizado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onDeleteDiscount = async () => {
    const { status } = await $Shop.discount.delete(discount);

    if (status) {
      setDiscounts((prev) => prev.filter((p) => p.id !== discount.id));
      setFeedback({ open: true, message: "Descuento eliminado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  return (
    <>
      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid display="flex" gap={1} justifyContent="flex-end">
          <Button variant="contained" size="small" onClick={() => setModal("create")}>
            Crear
          </Button>
        </Grid>
        <EnhancedTable headCells={discountsHeadCells} rows={discounts} />
      </Grid>

      <Dialog open={modal === "create" || modal === "update"} onClose={onClearFields} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">{modal === "create" ? "Crear" : "Editar"} descuento</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={1}
            onSubmit={modal === "create" ? onCreateDiscount : onUpdateDiscount}
          >
            <Grid display="flex" flexDirection="column" gap={2}>
              <Grid display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
                <TextField fullWidth select label="Tipo" name="name" value={discount.name} onChange={onChangeFields}>
                  <MenuItem disabled value="-">
                    Selecciona una opción
                  </MenuItem>
                  <MenuItem value="PACK STANDARD">PACK STANDARD</MenuItem>
                  <MenuItem value="PACK PREMIUM">PACK PREMIUM</MenuItem>
                </TextField>
                <FormControl fullWidth>
                  <InputLabel id="label-product-select">Producto</InputLabel>
                  <Select
                    label="Producto"
                    labelId="label-product-select"
                    name="id_product"
                    value={discount.id_product}
                    fullWidth
                    onChange={onChangeFields}
                  >
                    <MenuItem selected disabled>
                      Seleccione una opción
                    </MenuItem>
                    {products.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {e.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
                <TextField
                  label="% Descuento"
                  name="percent_discount"
                  value={discount.percent_discount}
                  onChange={onChangeFields}
                  fullWidth
                />
                <TextField label="Cantidad" name="quantity" value={discount.quantity} onChange={onChangeFields} fullWidth />
              </Grid>
              <Grid display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
                {/* <TextField label="Tir" name="tir" value={discount.tir} onChange={onChangeFields} fullWidth /> */}
                {/* <TextField
                  label="Producción en kg"
                  name="production_in_kilograms"
                  value={discount.production_in_kilograms}
                  onChange={onChangeFields}
                  fullWidth
                /> */}
              </Grid>
              <Grid display="flex" gap={2}>
                <MuiFileInput
                  fullWidth
                  label="Imagen"
                  value={discount.url_image}
                  onChange={(value) => onChangeFields({ target: { name: "url_image", value } })}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClearFields}>Cancelar</Button>
            <Button onClick={modal === "create" ? onCreateDiscount : onUpdateDiscount} variant="contained" disabled={!isValidProduct}>
              {modal === "create" ? "Crear" : "Editar"}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={modal === "delete"} onClose={onClearFields} fullWidth>
        <DialogTitle>Eliminar descuento</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar este descuento?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClearFields}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onDeleteDiscount}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Coupons({ service: $Shop, state, feedback }) {
  const [coupons, setCoupons] = state;
  const [, setFeedback] = feedback;
  const [coupon, setCoupon] = useState({
    id: null,
    name: "",
    discountPercentage: "",
    expirationDate: "",
  });
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const isValidProduct = useMemo(() => coupon.name && coupon.expirationDate && coupon.discountPercentage, [coupon]);

  const tableHeadCells = useMemo(
    () => [
      {
        id: "name",
        label: "Nombre",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "discountPercentage",
        label: "% Descuento",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "expirationDate",
        label: "Vence el",
        align: "left",
        disablePadding: false,
        format: (value) => (value ? dayjs(value).format("DD MMMM YYYY") : "-"),
      },
      {
        id: "id",
        label: "",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <IconButton
              onClick={() => {
                setCoupon(row);
                setModal("update");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setCoupon(row);
                setModal("delete");
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ),
      },
    ],
    []
  );

  const onChangeFields = ({ target }) => {
    const { name, value } = target;
    setCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const onClearFields = () => {
    setModal(null);
    setCoupon({ id: null, name: "", discountPercentage: "", contadorTime: "", tipo: "hora" });
  };

  const onCreate = async (event) => {
    event.preventDefault();

    if (!isValidProduct) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    setLoading(true);

    const { status, data } = await $Shop.coupon.add({
      name: coupon.name,
      discountPercentage: coupon.discountPercentage,
      expirationDate: coupon.expirationDate,
    });

    if (status) {
      setCoupons((prev) => [...prev, { ...coupon, id: data.data }]);
      setFeedback({ open: true, message: "Cupón creado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }

    setLoading(false);
  };

  const onUpdate = async (event) => {
    event.preventDefault();

    if (!isValidProduct) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    setLoading(true);

    const { status } = await $Shop.coupon.update({
      id: coupon.id,
      name: coupon.name,
      discountPercentage: coupon.discountPercentage,
      expirationDate: coupon.expirationDate,
    });

    if (status) {
      setCoupons((prev) => prev.map((p) => (p.id === coupon.id ? coupon : p)));
      setFeedback({ open: true, message: "Cupón actualizado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }

    setLoading(false);
  };

  const onDelete = async () => {
    setLoading(true);

    const { status } = await $Shop.coupon.delete(coupon);

    if (status) {
      setCoupons((prev) => prev.filter((p) => p.id !== coupon.id));
      setFeedback({ open: true, message: "Cupón eliminado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }

    setLoading(false);
  };

  return (
    <>
      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid display="flex" gap={1} justifyContent="flex-end">
          <Button variant="contained" size="small" onClick={() => setModal("create")}>
            Crear
          </Button>
        </Grid>
        <EnhancedTable headCells={tableHeadCells} rows={coupons} />
      </Grid>

      <Dialog open={modal === "create" || modal === "update"} onClose={onClearFields} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">{modal === "create" ? "Crear" : "Editar"} cupón</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={1}
            onSubmit={modal === "create" ? onCreate : onUpdate}
          >
            <Grid display="flex" flexDirection="column" gap={2}>
              <Grid display="flex" gap={2}>
                <TextField label="Cupón" name="name" value={coupon.name} onChange={onChangeFields} fullWidth />
                <TextField
                  label="Descuento"
                  name="discountPercentage"
                  value={coupon.discountPercentage}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                  onChange={onChangeFields}
                  fullWidth
                />
              </Grid>
              <Grid display="flex" gap={2}>
                <DatePicker
                  label="Fecha de expiración"
                  value={dayjs(coupon.expirationDate)}
                  format="DD MMMM YYYY"
                  sx={{ width: "100%" }}
                  slotProps={{ textField: { error: false } }}
                  onChange={(value) => onChangeFields({ target: { name: "expirationDate", value: value.toDate() } })}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClearFields}>Cancelar</Button>
            <LoadingButton
              loading={loading}
              onClick={modal === "create" ? onCreate : onUpdate}
              variant="contained"
              disabled={!isValidProduct}
            >
              {modal === "create" ? "Crear" : "Editar"}
            </LoadingButton>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={modal === "delete"} onClose={onClearFields} fullWidth>
        <DialogTitle>Eliminar cupón</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar este cupón?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClearFields}>
            Cancelar
          </Button>
          <LoadingButton loading={loading} variant="contained" onClick={onDelete}>
            Eliminar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Shop() {
  const $Shop = useShop();
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const [loading, setLoading] = useState({ importing: false });
  const $Production = useMemo(() => ($Shop.token ? new ProductionService($Shop.token) : null), [$Shop.token]);

  const fetchProducts = async () => {
    const { status, data } = await $Shop.product.get();

    if (status) {
      setProducts(data.data);
    }
  };

  const fetchDiscounts = async () => {
    const { status, data } = await $Shop.discount.get();

    if (status) {
      setDiscounts(data.data);
    }
  };

  const fetchCoupons = async () => {
    const { status, data } = await $Shop.coupon.get();

    if (status) {
      setCoupons(data.data);
    }
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  const onImport = async (file) => {
    if (!file) {
      setFeedback({ open: true, message: "Debe seleccionar un archivo.", status: "error" });
      return;
    }

    setLoading((prev) => ({ ...prev, importing: true }));

    const { status } = await $Production.import({ file });

    if (status) {
      setFeedback({ open: true, message: "Producción importada exitosamente.", status: "success" });
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }

    setLoading((prev) => ({ ...prev, importing: false }));
  };

  useEffect(() => {
    if ($Shop) {
      (async () => {
        await fetchProducts();
        await fetchDiscounts();
        await fetchCoupons();
      })();
    }
  }, [$Shop]);

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Box position="relative">
          <LoadingButton loading={loading.importing} variant="contained" size="small">
            Importar producción
          </LoadingButton>
          <input
            type="file"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              width: "100%",
              height: "100%",
              cursor: "pointer",
              aspectRatio: 1,
              opacity: 0,
            }}
            onChange={({ target }) => onImport(target.files[0])}
          />
        </Box>
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab} onChange={(event, value) => setCurrentTab(value)}>
          <Tab label="Productos" />
          <Tab label="Descuentos" />
          <Tab label="Cupones" />
        </Tabs>
      </Box>
      <TabPanel value={currentTab} index={0}>
        <Products token={$Shop.token} service={$Shop} state={[products, setProducts]} feedback={[feedback, setFeedback]} />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <Discounts service={$Shop} state={[discounts, setDiscounts]} products={products} feedback={[feedback, setFeedback]} />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <Coupons service={$Shop} state={[coupons, setCoupons]} feedback={[feedback, setFeedback]} />
      </TabPanel>

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={resetFeedback}
      >
        <Alert onClose={resetFeedback} severity={feedback.status} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Shop;
