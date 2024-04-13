import { useState } from 'react';
import { Box, Button } from '@mui/material';
import CustomTab from './MarketingCustomTabs';
import Section from './MarketingSectionList';
import { noShowAppointmentsList, guestAttendeesList, accountsWithoutInvitesList, completedPurchasesList  } from "../../utilities/constants";
import MarketingCard from './MarketingCard';
import FileUploadIcon from '@mui/icons-material/FileUpload';

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
      <Box sx={{ padding: '25px' }}>
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
      </Box>
    </div>
  );
};

export default Marketing;
