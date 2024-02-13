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
import PageWrapper from "./PageWrapper";
import { AvoviteWhiteIcon } from "./Icons";
import useSession from "../Hooks/useSession";
import TicketService from "../Services/ticket.service";
import { useNavigate } from "react-router-dom";
import IsChangeInformationBeneficiary from "./IsChangeInformationBeneficiary";
import IsChangeInformationUser from "./IsChangeInformationUser";
import IsChangeInformationBank from "./IsChangeInformationBank";
import UploadInformationOther from "./UploadInformationOther";

function CreateTicket({ setShowCreateTicket }) {
  const [session] = useSession();
  const $Ticket = useMemo(() => new TicketService(session.token), [session.token]);
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });
  const [valueOption, setValueOption] = useState("");
  const [isChangeInformationBeneficiary, setIsChangeInformationBeneficiary] = useState(false);
  const [isChangeInformationUser, setIsChangeInformationUser] = useState(false);
  const [isChangeInformationBank, setIsChangeInformationBank] = useState(false);

  const [frontalImage, setFrontalImage] = useState(null);
  const [traseraImage, setTraseraImage] = useState(null);
  const [certificateBank, setCertificateBank] = useState(null);
  const [filesOther, setFilesOther] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const informationToSend = {
      title: event.target.title.value,
      description: event.target.description.value,
      ticketCategory: null,
      informationUser: {
        title: event.target.title.value,
        description: event.target.description.value,
        ticketCategory: null,
        fullname: "",
        email: "",
        cellphone: null,
        id_type: "",
        id_number: null,
        id_location_expedition: "",
        // files: [],
      },
      informationBeneficiary: {
        title: event.target.title.value,
        description: event.target.description.value,
        ticketCategory: null,
        cod_municipio_beneficiary: "",
        beneficiary_fullname: "",
        beneficiary_id_number: "",
        beneficiary_id_type: "",
        beneficiary_id_location_expedition: "",
        address_residence_beneficiary: "",
        email_beneficiary: "",
        cellphone_beneficiary: "",
        civil_status_beneficiary: "",
        economy_activity_beneficiary: "",
        country_of_residence_beneficiary: "",
        // files:[]
      },
      informationBank: {
        title: event.target.title.value,
        description: event.target.description.value,
        ticketCategory: null,
        // files: [],
      },
      oter: {
        title: event.target.title.value,
        description: event.target.description.value,
        ticketCategory: null,
        // files:[]
      },
      bugs: {
        title: event.target.title.value,
        description: event.target.description.value,
        ticketCategory: null,
        // files:[]
      },
    };


    if (event.target.elements.ticketCategory.value === "Bugs") {
      informationToSend.bugs.ticketCategory = "Bugs";
      informationToSend.ticketCategory = "Bugs";
      if(filesOther){
        const filesOtherFormData=new FormData()
        filesOtherFormData.append("file",filesOther)
        informationToSend.bugs.files.push(filesOtherFormData)
        setFilesOther(null)
      }
    }

    if (event.target.elements.ticketCategory.value === "Oter") {
      informationToSend.oter.ticketCategory = "Oter";
      informationToSend.ticketCategory = "Oter";
      if(filesOther){
        const filesOtherFormData=new FormData()
        filesOtherFormData.append("file",filesOther)
        informationToSend.oter.files.push(filesOtherFormData)
        setFilesOther(null)
      }
    }

    if (event.target.elements.ticketCategory.value === "Change information bank") {
      informationToSend.informationBank.ticketCategory = "Change information bank";
      informationToSend.ticketCategory = "Change information bank";
      const certificateBankFormData = new FormData();
      certificateBankFormData.append("certificate", certificateBank);
      informationToSend.informationBank.files.push(certificateBankFormData);
    }

    if (event.target.elements.ticketCategory.value === "Change information user") {
      informationToSend.informationUser.ticketCategory = "Change information user";
      informationToSend.ticketCategory = "Change information user";

      informationToSend.informationUser.fullname = event.target.elements.fullname.value;
      informationToSend.informationUser.email = event.target.elements.email.value;
      informationToSend.informationUser.cellphone = event.target.elements.cellphone.value;
      informationToSend.informationUser["id_type"] = event.target.elements.idType.value;
      informationToSend.informationUser["id_number"] = event.target.elements.idNumber.value;
      informationToSend.informationUser["id_location_expedition"] = event.target.elements.idLocExpedition.value;

      if (!frontalImage && !traseraImage) {
        setAlert({
          show: true,
          message: "No olvides subir foto de tu documento.",
          status: "error",
        });
        return;
      }

      const frontalImageFormData = new FormData();
      frontalImageFormData.append("fotoFrontal", frontalImage);
      informationToSend.informationUser.files.push(frontalImageFormData);
      const traseraImageFormData = new FormData();
      traseraImageFormData.append("fotoTrasera", traseraImage);
      informationToSend.informationUser.files.push(traseraImageFormData);
    }

    if (event.target.elements.ticketCategory.value === "Change information beneficiary") {
      informationToSend.informationBeneficiary.ticketCategory = "Change information beneficiary";
      informationToSend.ticketCategory = "Change information beneficiary";
      informationToSend.informationBeneficiary["cod_municipio_beneficiary"] = event.target.elements.codMunicipioBeneficiary.value;
      informationToSend.informationBeneficiary["beneficiary_fullname"] = event.target.elements.beneficiaryFullname.value;
      informationToSend.informationBeneficiary["beneficiary_id_number"] = event.target.elements.beneficiaryIdNumber.value;
      informationToSend.informationBeneficiary["beneficiary_id_type"] = event.target.elements.idType.value.toLowerCase();
      informationToSend.informationBeneficiary["beneficiary_id_location_expedition"] =
        event.target.elements.beneficiaryIdLocationExpedition.value;
      informationToSend.informationBeneficiary["address_residence_beneficiary"] = event.target.elements.addressResidenceBeneficiary.value;
      informationToSend.informationBeneficiary["email_beneficiary"] = event.target.elements.emailBeneficiary.value;
      informationToSend.informationBeneficiary["cellphone_beneficiary"] = event.target.elements.cellphoneBeneficiary.value;
      informationToSend.informationBeneficiary["civil_status_beneficiary"] = event.target.elements.civilStatus.value;
      informationToSend.informationBeneficiary["economy_activity_beneficiary"] = event.target.elements.economyActivityBeneficiary.value;
      informationToSend.informationBeneficiary["country_of_residence_beneficiary"] =
        event.target.elements.countryOfResidenceBeneficiary.value;
        if(filesOther){
          const filesOtherFormData=new FormData()
          filesOtherFormData.append("file",filesOther)
          informationToSend.informationBeneficiary.files.push(filesOtherFormData)
          setFilesOther(null)
        }
    }

    if (!informationToSend.title || !informationToSend.description || !informationToSend.ticketCategory) {
      setAlert({
        show: true,
        message: "Todos los campos son requeridos.",
        status: "error",
      });
      return;
    }

    sendInformation(informationToSend);
  };

  const sendInformation = async (informationToSend) => {
    if (informationToSend.bugs.title && informationToSend.bugs.description && informationToSend.bugs.ticketCategory) {
      const { status } = await $Ticket.create(informationToSend.bugs);
      if (status) {
        ticketCreatedCorrectly(status);
        setShowCreateTicket(false);
      }
    }

    if (informationToSend.oter.title && informationToSend.oter.description && informationToSend.oter.ticketCategory) {
      const { status } = await $Ticket.create(informationToSend.oter);
      if (status) {
        ticketCreatedCorrectly(status);
        setShowCreateTicket(false);
      }
    }

    if (
      informationToSend.informationBank.title &&
      informationToSend.informationBank.description &&
      informationToSend.informationBank.ticketCategory
    ) {
      const { status } = await $Ticket.create(informationToSend.informationBank);
      if (status) {
        ticketCreatedCorrectly(status);
        setTimeout(() => {
          setShowCreateTicket(false);
        }, 2000);
      }else{
        setAlert({
          show: true,
          message: "Hubo en error al enviar la información",
          status: "error",
        });
      }
    }

    if (
      informationToSend.informationUser.title &&
      informationToSend.informationUser.description &&
      informationToSend.informationUser.ticketCategory &&
      informationToSend.informationUser.files
    ) {
      const { status } = await $Ticket.create(informationToSend.informationUser);
      if (status) {
        ticketCreatedCorrectly(status);
        setTimeout(() => {
          setShowCreateTicket(false);
        }, 2000);
      }else{
        setAlert({
          show: true,
          message: "Hubo en error al enviar la información",
          status: "error",
        });
      }// falta files[foto frontal, foto trasera]
    }

    if (
      informationToSend.informationBeneficiary.title &&
      informationToSend.informationBeneficiary.description &&
      informationToSend.informationBeneficiary.ticketCategory
    ) {
      const { status } = await $Ticket.create(informationToSend.informationBeneficiary);
      if (status) {
        ticketCreatedCorrectly(status);
        setTimeout(() => {
          setShowCreateTicket(false);
        }, 2000);
      }else{
        setAlert({
          show: true,
          message: "Hubo en error al enviar la información",
          status: "error",
        });
      }

    }
  };

  const ticketCreatedCorrectly = (status) => {
    if (status) {
      setAlert({ show: true, message: "Tu ticket ha sido creado con éxito", status: "success" });
    } else {
      setAlert({ show: true, message: "Hubo un error al crear tu ticket.", status: "error" });
    }
  };
  const handleInputChange = (event) => {
    const ticketCategory = event.target.value;
    setValueOption(ticketCategory);

    if (ticketCategory === "Change information bank") {
      setIsChangeInformationBank(true);
      setIsChangeInformationUser(false);
      setIsChangeInformationBeneficiary(false);
    }
    if (ticketCategory === "Bugs") {
      setIsChangeInformationBank(false);
      setIsChangeInformationUser(false);
      setIsChangeInformationBeneficiary(false);
      setFrontalImage(false);
      setTraseraImage(false);
    }
    if (ticketCategory === "Change information user") {
      setIsChangeInformationBank(false);
      setIsChangeInformationUser(true);
      setIsChangeInformationBeneficiary(false);
      setFrontalImage(false);
      setTraseraImage(false);
    }
    if (ticketCategory === "Oter") {
      setIsChangeInformationBank(false);
      setIsChangeInformationUser(false);
      setIsChangeInformationBeneficiary(false);
      setFrontalImage(false);
      setTraseraImage(false);
    }
    if (ticketCategory === "Change information beneficiary") {
      setIsChangeInformationBank(false);
      setIsChangeInformationUser(false);
      setIsChangeInformationBeneficiary(true);
      setFrontalImage(false);
      setTraseraImage(false);
    }
  };

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  useEffect(() => {
    if (session.user) {
      if (session.user.status_terms_and_conditions == 0 || !session.user.status_terms_and_conditions_date) {
        navigate("/dashboard");
      }
    }
  }, [session.user]);

  if (!session.user) {
    return <></>;
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
        <FormControl variant="outlined" fullWidth sx={{ marginTop: "20px" }}>
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
                  <MenuItem value="Oter">Otro</MenuItem>
                </Select>
              </Grid>
              <Grid container xs={12} marginTop="20px" fullWidth marginLeft="15px">
                <IsChangeInformationBeneficiary
                  isChangeInformationBeneficiary={isChangeInformationBeneficiary}
                  handleInputChange={handleInputChange}
                />
                <IsChangeInformationUser
                  isChangeInformationUser={isChangeInformationUser}
                  handleInputChange={handleInputChange}
                  frontalImage={frontalImage}
                  setFrontalImage={setFrontalImage}
                  traseraImage={traseraImage}
                  setTraseraImage={setTraseraImage}
                />
                <IsChangeInformationBank
                  isChangeInformationBank={isChangeInformationBank}
                  setCertificateBank={setCertificateBank}
                  certificateBank={certificateBank}
                />
              </Grid>

              <Grid item xs={12}>

                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: "20px" }} disabled={!valueOption && true}>
                  Enviar Solicitud
                </Button>
                {!isChangeInformationBank && !isChangeInformationUser && (
                  <UploadInformationOther setFilesOther={setFilesOther} filesOther={filesOther} valueOption={valueOption} />
                )}
                <Button
                  onClick={() => setShowCreateTicket(false)}
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "20px", marginLeft: "10px" }}
                >
                  Ver tickets
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

export default CreateTicket;
