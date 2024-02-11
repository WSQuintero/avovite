import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function TicketModalUser({ ticket, open, onClose }) {

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80%',
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
        borderRadius: 4,
      }}>
        <Typography variant="h5" component="h2" id="modal-title" sx={{ marginBottom: 2 }}>
          Información del Ticket
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" id="modal-description">
            <strong>ID:</strong> {ticket?.id}<br />
            <strong>Título:</strong> {ticket?.title}<br />
            <strong>Descripción:</strong> {ticket?.description}<br />
            <strong>Estado:</strong> {ticket?.ticketStatus}<br />
            {ticket?.created_at && <><strong>Creado el:</strong> {ticket?.created_at}<br /></>}
            {ticket?.update_at && <><strong>Actualizado el:</strong> {ticket?.update_at}<br /></>}
            {ticket?.address_residence_beneficiary && <><strong>Dirección de Residencia del Beneficiario:</strong> {ticket?.address_residence_beneficiary}<br /></>}
            {ticket?.backDocumentUrl && <><strong>URL del Documento Posterior:</strong> {ticket?.backDocumentUrl}<br /></>}
            {ticket?.bankUrl && <><strong>URL del Banco:</strong> {ticket?.bankUrl}<br /></>}
            {ticket?.beneficiary_fullname && <><strong>Nombre Completo del Beneficiario:</strong> {ticket?.beneficiary_fullname}<br /></>}
            {ticket?.beneficiary_id_location_expedition && <><strong>Lugar de Expedición de la Identificación del Beneficiario:</strong> {ticket?.beneficiary_id_location_expedition}<br /></>}
            {ticket?.beneficiary_id_number && <><strong>Número de Identificación del Beneficiario:</strong> {ticket?.beneficiary_id_number}<br /></>}
            {ticket?.beneficiary_id_type && <><strong>Tipo de Identificación del Beneficiario:</strong> {ticket?.beneficiary_id_type}<br /></>}
            {ticket?.cellphone && <><strong>Teléfono:</strong> {ticket?.cellphone}<br /></>}
            {ticket?.cellphone_beneficiary && <><strong>Teléfono del Beneficiario:</strong> {ticket?.cellphone_beneficiary}<br /></>}
            {ticket?.civil_status_beneficiary && <><strong>Estado Civil del Beneficiario:</strong> {ticket?.civil_status_beneficiary}<br /></>}
            {ticket?.cod_municipio_beneficiary && <><strong>Código del Municipio del Beneficiario:</strong> {ticket?.cod_municipio_beneficiary}<br /></>}
            {ticket?.country_of_residence_beneficiary && <><strong>País de Residencia del Beneficiario:</strong> {ticket?.country_of_residence_beneficiary}<br /></>}
            {ticket?.economy_activity_beneficiary && <><strong>Actividad Económica del Beneficiario:</strong> {ticket?.economy_activity_beneficiary}<br /></>}
            {ticket?.email && <><strong>Correo Electrónico:</strong> {ticket?.email}<br /></>}
            {ticket?.email_beneficiary && <><strong>Correo Electrónico del Beneficiario:</strong> {ticket?.email_beneficiary}<br /></>}
            {ticket?.frontDocumentUrl && <><strong>URL del Documento Frontal:</strong> {ticket?.frontDocumentUrl}<br /></>}
            {ticket?.fullname && <><strong>Nombre Completo:</strong> {ticket?.fullname}<br /></>}
            {ticket?.id_location_expedition && <><strong>Lugar de Expedición de la Identificación:</strong> {ticket?.id_location_expedition}<br /></>}
            {ticket?.id_number && <><strong>Número de Identificación:</strong> {ticket?.id_number}<br /></>}
            {ticket?.id_type && <><strong>Tipo de Identificación:</strong> {ticket?.id_type}<br /></>}
          </Typography>
        </Box>
        <Button onClick={handleClose} variant="contained" color="primary">Cerrar</Button>
      </Box>
    </Modal>
  );
}

export default TicketModalUser