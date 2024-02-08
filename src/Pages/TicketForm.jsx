import { Box, Button, Container, FormControl, Grid, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import { AvoviteWhiteIcon } from "../Components/Icons";
import useSession from "../Hooks/useSession";
import TicketService from "../Services/ticket.service";
import { useNavigate } from "react-router-dom";

function TicketForm  ({ onSubmit }) {
  const [session, { setUser: setSession }] = useSession();
  const $Ticket = useMemo(() => new TicketService(session.token), [session.token]);
  const [actualTicket,setActualTicket]=useState()
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    id_type: "",
    id_number: "",
    id_location_expedition: "",
    cellphone: "",
    location_residence: "",
    additional_info: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    const title=event.target.title.value
    const description=event.target.description.value
    const ticketCategory=event.target.ticketCategory.value


    if (!title &&!description &&!ticketCategory) {
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

  useEffect(() => {
    if (session.user) {
      if(session.user.status_terms_and_conditions==0||!session.user.status_terms_and_conditions_date){
        navigate('/dashboard');
      }else{
        // setActualTicket({
        //   title: session.user.title || "",
        //   description: session.user.description || "",
        //   ticketCategory: session.user.ticketCategory || "",
        // });
      }

    }
  }, [session.user]);

  if (!session.user) {
    return <></>;
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  // };

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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField name="title" label="Título" fullWidth value={formData.title} onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12} sm={12} style={{ width: "100%", height: "150px" }}>
              <TextareaAutosize
                fullWidth
                name="description"
                aria-label="Descripción del requerimiento"
                placeholder="Descripción del requerimiento"
                value={formData.description}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  height: '150px',
                  resize: 'none',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: '10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '16px',
                  color: '#979797',
                  backgroundColor: '#E8E8E8',
                  '&:hover': {
                    borderColor: '#67AA36',
                  },
                  '&:active': {
                    borderColor: '#67AA36',
                    outline: 'none', // Elimina el borde rojo predeterminado del enfoque
                  },
                }}             />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField name="TicketCategory" label="Tipo de requerimiento" fullWidth value={formData.title} onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{marginTop:"20px"}}>
                Enviar Solicitud
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </PageWrapper>
  );
}

export default TicketForm;
