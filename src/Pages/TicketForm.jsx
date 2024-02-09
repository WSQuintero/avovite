import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import { AvoviteWhiteIcon } from "../Components/Icons";
import useSession from "../Hooks/useSession";
import TicketService from "../Services/ticket.service";
import { useNavigate } from "react-router-dom";
import IsChangeInformationBeneficiary from "../Components/IsChangeInformationBeneficiary";
import IsChangeInformationUser from "../Components/IsChangeInformationUser";
import IsChangeInformationBank from "../Components/IsChangeInformationBank";

function TicketForm({ onSubmit }) {
  const [session, { setUser: setSession }] = useSession();
  const $Ticket = useMemo(() => new TicketService(session.token), [session.token]);
  const [actualTicket, setActualTicket] = useState();
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });
  const [valueOption, setValueOption] = useState("");
  const [isChangeInformationBeneficiary, setIsChangeInformationBeneficiary] = useState(false);
  const [isChangeBugs, setIsChangeBugs] = useState(false);
  const [isChangeInformationUser, setIsChangeInformationUser] = useState(false);
  const [isChangeOther, setIsChangeOther] = useState(false);
  const [isChangeInformationBank, setIsChangeInformationBank] = useState(false);
  const [isChangedCedula, setIsChangedCedula] = useState(false);
  const [isChangedTarjetaDeIdentidad, setIsChangedTarjetaDeIdentidad] = useState(false);
  const [isChangedCedulaExtranjeria, setIChangedCedulaExtranjeria] = useState(false);
  const [isChangedPasaporte, setIsChangedPasaporte] = useState(false);
  const [isChangedRegistroCivil, setIsChangedRegistroCivil] = useState(false);
  const [isChangedDni, setIsChangedDni] = useState(false);

  const navigate = useNavigate();

  const resetStateOptions = () => {



    setIsChangeBugs(false);
    setIsChangeInformationUser(false);
    setIsChangeOther(false);
    setIsChangeInformationBank(false);
    setIsChangedTarjetaDeIdentidad(false);
    setIChangedCedulaExtranjeria(false);
    setIsChangedPasaporte(false);
    setIsChangedRegistroCivil(false);
    setIsChangedDni(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    resetStateOptions();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const ticketCategory = valueOption;

    console.log({ title, description, ticketCategory });

    if (!title || !description || !ticketCategory) {
      setAlert({
        show: true,
        message: "Todos los campos son requeridos.",
        status: "error",
      });
      return;
    }

    // const { status } = await $Ticket.update({});

    // if (status) {
    //   setAlert({ show: true, message: "Tu usuario ha sido actualizado con éxito.", status: "success" });
    //   const { avatar, ...rest } = user;
    //   setSession({ ...session.user, ...rest });
    // } else {
    //   setAlert({ show: true, message: "Ha ocurrido un error", status: "error" });
    // }
  };

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };
  useEffect(()=>{
    if(isChangedCedula||
      isChangedTarjetaDeIdentidad||
      isChangedCedulaExtranjeria||
      isChangedPasaporte||
      isChangedRegistroCivil||
      isChangedDni){

      setIsChangeInformationBeneficiary(true);

      }

      if(isChangeBugs||
        isChangeInformationUser||
        isChangeOther||
        isChangeInformationBank){
          setIsChangeInformationBeneficiary(false);

      }
  },[isChangedCedula,
    isChangedTarjetaDeIdentidad,
    isChangedCedulaExtranjeria,
    isChangedPasaporte,
    isChangedRegistroCivil,
    isChangedDni,isChangeBugs,
    isChangeInformationUser,
    isChangeOther,
    isChangeInformationBank])

  useEffect(() => {
    if (session.user) {
      if (session.user.status_terms_and_conditions == 0 || !session.user.status_terms_and_conditions_date) {
        navigate("/dashboard");
      } else {
        // setActualTicket({
        //   title: ticket.user.title || "",
        //   description: session.user.description || "",
        //   ticketCategory: session.user.ticketCategory || "",
        // });
      }
    }
  }, [session.user]);

  if (!session.user) {
    return <></>;
  }

  const handleInputChange = (event) => {
    resetStateOptions();
       const ticketCategory = event.target.value;
    setValueOption(ticketCategory);
    console.log(ticketCategory);
    if (ticketCategory === "Change information beneficiary") setIsChangeInformationBeneficiary(true);
    if (ticketCategory === "Bugs") setIsChangeBugs(true);
    if (ticketCategory === "Change information user") setIsChangeInformationUser(true);
    if (ticketCategory === "Oter") setIsChangeOther(true);
    if (ticketCategory === "Change information bank") setIsChangeInformationBank(true);
    if (ticketCategory === "cedula") setIsChangedCedula(true);

    if (ticketCategory === "tarjetaIdentidad") setIsChangedTarjetaDeIdentidad(true);
    if (ticketCategory === "cedulaExtranjeria") setIChangedCedulaExtranjeria(true);
    if (ticketCategory === "pasaporte") setIsChangedPasaporte(true);
    if (ticketCategory === "registroCivil") setIsChangedRegistroCivil(true);
    if (ticketCategory === "dni") setIsChangedDni(true);
  };


  function handleFileChange(event, index) {
    event.stopPropagation();
    const files = event.target.files;
    const selectedFile = files && files[0]; // Obtener el primer archivo seleccionado
    // Puedes hacer más validaciones aquí, como el tamaño del archivo, el tipo de archivo, etc.

    // Hacer algo con el archivo seleccionado, como enviarlo al servidor o actualizar el estado con la imagen
    console.log(`Archivo ${index === 0 ? "frontal" : "trasera"} seleccionado:`, selectedFile);

    // Si necesitas actualizar el estado con el archivo seleccionado, puedes hacerlo así
    // setFrontalImage(selectedFile); // Por ejemplo, si index es 0
    // setTraseraImage(selectedFile); // Por ejemplo, si index es 1
  }

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Solicitud de actualización de datos
          </Typography>
        </Stack>
        <FormControl variant="outlined" fullWidth onSubmit={handleFormSubmit} sx={{ marginTop: "20px" }}>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField name="title" label="Título" fullWidth required />
              </Grid>
              <Grid item xs={12} sm={12} style={{ width: "100%", height: "150px" }}>
                <TextareaAutosize
                  fullWidth
                  name="description"
                  aria-label="Descripción del requerimiento"
                  placeholder="Descripción del requerimiento"
                  // onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    height: "150px",
                    resize: "none",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: "10px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "16px",
                    color: "#979797",
                    backgroundColor: "#fff",
                    outline: "none",
                    padding: "10px",
                    outlineColor: "#67AA36",
                    "&:hover": {
                      borderColor: "#67AA36",
                      outline: "solid 1px #67AA36",
                    },
                    "&:focus": {
                      borderColor: "#67AA36",
                      outline: "none", // Elimina el borde rojo predeterminado del enfoque
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Select
                  name="ticketCategory"
                  labelId="ticket-category-label"
                  id="ticket-category-select"
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginTop: "50px", fontSize: "14px" }}
                >
                  <MenuItem value="Change information bank">Cambiar información bancaria</MenuItem>
                  <MenuItem value="Change information user">Cambiar información de usuario</MenuItem>
                  <MenuItem value="Change information beneficiary">Cambiar información de beneficiario</MenuItem>
                  <MenuItem value="Bugs">Errores</MenuItem>
                  <MenuItem value="Other">Otro</MenuItem>
                </Select>
              </Grid>
              <Grid container xs={12} marginTop="20px" fullWidth marginLeft="15px">
                <IsChangeInformationBeneficiary
                  isChangeInformationBeneficiary={isChangeInformationBeneficiary}
                  handleInputChange={handleInputChange}
                />
                <IsChangeInformationUser isChangeInformationUser={isChangeInformationUser} handleInputChange={handleInputChange} />
                <IsChangeInformationBank isChangeInformationBank={isChangeInformationBank} handleFileChange={handleFileChange} />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: "20px" }} disabled={!valueOption && true}>
                  Enviar Solicitud
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormControl>
      </Container>
      <Snackbar open={alert.show} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={resetAlert}>
        <Alert severity={alert.status} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}

export default TicketForm;
