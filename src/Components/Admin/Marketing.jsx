import { useState } from 'react';
import { Box, Button, MenuItem, Typography } from '@mui/material';
import CustomTab from './MarketingCustomTabs';
import Section from './MarketingSectionList';
import { MaterialReactTable } from "material-react-table";
import { noShowAppointmentsList, guestAttendeesList, accountsWithoutInvitesList, completedPurchasesList, campaignsList, messagesList  } from "../../utilities/constants";
import MarketingCard from './MarketingCard';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DateRangeModal from "./DateRangeModal";
import { FileDownload as DownloadIcon, CreateNewFolder } from "@mui/icons-material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { formatDate } from "../../utilities/index";

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

  const columnsCampaigns = [
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

  const columnsMessages = [
    {
      accessorKey: "created_at",
      id: "campaing_date",
      header: "Fecha",
      Cell: ({ renderedCellValue }) => {
        return <Typography>{formatDate(renderedCellValue)}</Typography>;
      },
    },
    {
      accessorKey: "state_message",
      id: "state_message",
      header: "Estado Mensaje",
    },
    {
      accessorKey: "channels",
      id: "channels",
      header: "Canal",
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
      accessorKey: "lead_email",
      id: "lead_email",
      header: "Correo Lead",
    },
    {
      accessorKey: "lead_phone",
      id: "lead_phone",
      header: "Teléfono lead",
    },
    {
      accessorKey: "lead_fullname",
      id: "lead_fullname",
      header: "Nombre lead",
    }
  ];

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ flex: 3 }}>
          <CustomTab label="Leads" selected={currentTab === 'Automation'} onClick={() => handleClick('Automation')} />
          <CustomTab label="Campañas" selected={currentTab === 'Campaign'} onClick={() => handleClick('Campaign')} />
          <CustomTab label="Histórico Mensajes" selected={currentTab === 'Message'} onClick={() => handleClick('Message')} />
        </Box>
        {currentTab === 'Automation'&&(<Button variant="contained" color="primary" onClick={() => console.log('Upload .xlss file')} startIcon={<FileUploadIcon/>}>
          Cargar .xlss con leads
        </Button>)}
        {currentTab === 'Campaign'&&(<Button variant="contained" color="primary" onClick={() => console.log('Upload .xlss file')} startIcon={<CreateNewFolder/>}>
          Nueva Campaña
        </Button>)}
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
            columns={columnsCampaigns}
            data={campaignsList}
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
                Ejecutar Campaña
              </MenuItem>
            ]}
          />
        </Box>
      </Box>)}
      {currentTab === 'Message'&&(<Box sx={{ padding: '25px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <MaterialReactTable
            columns={columnsMessages}
            data={messagesList}
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
                Reenviar Mensaje
              </MenuItem>
            ]}
          />
        </Box>
      </Box>)}
    </div>
  );
};

export default Marketing;
