import { useState } from 'react';
import { Box, Button } from '@mui/material';
import CustomTab from './MarketingCustomTabs';
import Section from './MarketingSectionList';
import { MaterialReactTable } from "material-react-table";
import { noShowAppointmentsList, guestAttendeesList, accountsWithoutInvitesList, completedPurchasesList  } from "../../utilities/constants";
import MarketingCard from './MarketingCard';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DateRangeModal from "./DateRangeModal";
import { FileDownload as DownloadIcon } from "@mui/icons-material";
import { MRT_Localization_ES } from "material-react-table/locales/es";

const Marketing = () => {
  const [currentTab, setCurrentTab] = useState('Automation');
  const imageUrl = 'https://t1.ea.ltmcdn.com/es/posts/6/6/7/la_alimentacion_de_los_canguros_20766_orig.jpg'; 

  const handleClick = (tabName) => {
    setCurrentTab(tabName);
  };

  const renderMarketingCards = (list) => {
    return list.map((item, index) => (
      <MarketingCard
        image={imageUrl}
        key={index}
        completeName={item.completeName}
        email={item.email}
        source={item.source}
        date={item.date}
        phoneNumber={item.phoneNumber}
        status={item.status}
        lastAppointment={item.lastAppointment}
        link={item.link}
      />
    ));
  };

  const columns = [
    {
      accessorKey: "created_at",
      id: "campaing_date",
      header: "Fecha",
      Cell: ({ renderedCellValue }) => {
        return <Typography>{formatDate(renderedCellValue)}</Typography>;
      },
    },
    {
      accessorKey: "state_lead",
      id: "state_lead",
      header: "Estado Lead",
    },
    {
      accessorKey: "title",
      id: "title",
      header: "Título",
    },
    {
      accessorKey: "marketing_origin",
      id: "marketing_origin",
      header: "Origen Lead",
    },
    {
      accessorKey: "channels",
      id: "channels",
      header: "Canales",
    },
    {
      accessorKey: "hour",
      id: "hour",
      header: "Hora",
    },
    {
      accessorKey: "status",
      id: "status",
      header: "Estado",
    }
  ];

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ flex: 3 }}>
          <CustomTab label="Automation" selected={currentTab === 'Automation'} onClick={() => handleClick('Automation')} />
          <CustomTab label="Campaign" selected={currentTab === 'Campaign'} onClick={() => handleClick('Campaign')} />
          <CustomTab label="Message" selected={currentTab === 'Message'} onClick={() => handleClick('Message')} />
          <CustomTab label="Report" selected={currentTab === 'Report'} onClick={() => handleClick('Report')} />
        </Box>
        <Button variant="contained" color="primary" onClick={() => console.log('Upload .xlss file')} startIcon={<FileUploadIcon/>}>
          Upload .xlss file
        </Button>
      </Box>
      {currentTab === 'Automation'&&(<Box sx={{ padding: '25px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Section title="No show Appointments" value={noShowAppointmentsList.length}>
            {renderMarketingCards(noShowAppointmentsList)}
          </Section>
          <Section title="Guest Attendees" value={guestAttendeesList.length}>
            {renderMarketingCards(guestAttendeesList)}
          </Section>
          <Section title="Accounts Without Invites" value={accountsWithoutInvitesList.length}>
            {renderMarketingCards(accountsWithoutInvitesList)}
          </Section>
          <Section title="Completed Purchases" value={completedPurchasesList.length}>
            {renderMarketingCards(completedPurchasesList)}
          </Section>
        </Box>
      </Box>)}
      {currentTab === 'Campaign'&&(<Box sx={{ padding: '25px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <MaterialReactTable
            columns={columns}
            data={[]}
            enableColumnFilterModes
            enableColumnOrdering
            enableRowActions
            muiTablePaperProps={{ elevation: 0 }}
            initialState={{ density: "compact" }}
            muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
            state={{ showSkeletons: false }}
            localization={MRT_Localization_ES}
            enablePagination={false}
            renderRowActionMenuItems={({ closeMenu, row: { original } }) => [
              <MenuItem
                key={0}
                disabled={original.status_contracts === 0}
                onClick={() => {
                  closeMenu();
                  window.open(`${import.meta.env.VITE_API_URL}/contracts/files/${original.id}`, "_blank");
                }}
              >
                Ver contrato
              </MenuItem>,
              // <MenuItem
              //   key={2}
              //   disabled={original.status_contracts !== 0}
              //   onClick={() => {
              //     closeMenu();
              //     setSelectedContract(original), setContract((prev) => ({ ...prev, mortgage_contract: original.mortgage_contract || 0 }));
              //   }}
              // >
              //   Completar contrato
              // </MenuItem>,
              <MenuItem
                key={2}
                // disabled={original.status_contracts !== 0}
                onClick={() => {
                  closeMenu();
                  setOpen(true);
                  setActualContractId(original.id);
                }}
              >
                Cancelar contrato
              </MenuItem>,
              <MenuItem
                key={3}
                disabled={original.status_contracts === 0}
                onClick={async () => {
                  closeMenu();
                  await fetchContractDues(original.id);
                  setModal("open-contract-dues");
                }}
              >
                Ver cuotas
              </MenuItem>,
              <Divider key="divider-1" />,
              <MenuItem
                key={1.5}
                disabled={loadingSigning}
                onClick={() => {
                  closeMenu();
                  onSendSignature(original);
                }}
                sx={{ gap: 1, alignItems: "center" }}
              >
                {loadingSigning && <CircularProgress size={16} />} Envia firma
              </MenuItem>,
              <MenuItem
                key={1.75}
                disabled={!original.urlValidocus}
                onClick={() => {
                  closeMenu();
                  window.open(original.urlValidocus, "_blank");
                }}
                sx={{ gap: 1, alignItems: "center" }}
              >
                Ver firma
              </MenuItem>,
              <Divider key="divider-2" />,
              <MenuItem
                key={1}
                onClick={async () => {
                  closeMenu();
                  setContract(original);
                  setModal("edit-contract");
                }}
              >
                Editar contrato
              </MenuItem>,
              original.status_contracts !== 0 ? (
                <MenuItem
                  key={2}
                  sx={{ color: "error.main" }}
                  onClick={async () => {
                    closeMenu();
                    await onDeleteContract(original.id);
                  }}
                >
                  Solicitar eliminar
                </MenuItem>
              ) : (
                <MenuItem
                  key={3}
                  sx={{ color: "error.main" }}
                  onClick={async () => {
                    closeMenu();
                    await onDeleteContract(original.id, true);
                  }}
                >
                  Eliminar contrato
                </MenuItem>
              ),
            ]}
            renderDetailPanel={({ row: { original: row } }) => (
              <Grid display="flex" flexDirection="column" gap={2} width="100%" padding={2}>
                <Grid display="flex" flexDirection="column" gap={1}>
                  <Typography variant="h4" mt={4}>
                    Información financiera
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Financiado:{" "}
                    </Typography>
                    {row.financed ? "Si" : "No"}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Descuento:{" "}
                    </Typography>
                    {row.percentage_discount}%
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Valor descontado:{" "}
                    </Typography>
                    ${formatCurrency(row.contract_discount)}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Total con descuento:{" "}
                    </Typography>
                    ${formatCurrency(row.total_contract_with_discount)}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Fecha de contrato:{" "}
                    </Typography>
                    {formatDate(row.created_at)}
                  </Typography>
                  <Typography variant="h4" mt={4}>
                    Información de primer pago
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Valor:{" "}
                    </Typography>
                    ${formatCurrency(row.first_payment)}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Fecha:{" "}
                    </Typography>
                    {formatLongDate(row.first_payment_date)}
                  </Typography>

                  <Typography variant="h4" mt={4}>
                    Información del titular
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Nombre:{" "}
                    </Typography>
                    {row.fullname}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Teléfono:{" "}
                    </Typography>
                    {row.cellphone}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Correo:{" "}
                    </Typography>
                    {row.email}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Tipo de documento:{" "}
                    </Typography>
                    {row.id_type}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Número de documento:{" "}
                    </Typography>
                    {row.id_number}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Lugar de expedición documento:{" "}
                    </Typography>
                    {row.id_location_expedition}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Número de cuenta:{" "}
                    </Typography>
                    {row.user_bank_account_number}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Tipo de cuenta:{" "}
                    </Typography>
                    {constants?.account_type?.find((a) => String(a.id) === String(row.user_bank_account_type))?.name}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Banco:{" "}
                    </Typography>
                    {constants?.banks?.find((a) => String(a.id) === String(row.user_id_bank))?.name}
                  </Typography>

                  <Typography variant="h4" mt={4}>
                    Información del beneficiario
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Nombre:{" "}
                    </Typography>
                    {row.beneficiary_fullname}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Tipo de documento:{" "}
                    </Typography>
                    {row.beneficiary_id_type}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Número de documento:{" "}
                    </Typography>
                    {row.beneficiary_id_number}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Lugar de expedición del documento:{" "}
                    </Typography>
                    {row.beneficiary_id_location_expedition}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Teléfono:{" "}
                    </Typography>
                    {row.cellphone_beneficiary}
                  </Typography>
                  <Typography>
                    <Typography component="span" fontWeight={600}>
                      Correo electrónico:{" "}
                    </Typography>
                    {row.email_beneficiary}
                  </Typography>
                </Grid>
              </Grid>
            )}
          />
        </Box>
      </Box>)}
    </div>
  );
};

export default Marketing;
