export const IMAGE_PLACEHOLDER = "https://cutewallpaper.org/24/image-placeholder-png/emoji.png";

const domain = window.location.hostname;

export const TESTING_EPAYCO = domain === "appdev.avovite.com" || domain === "localhost";
// export const TESTING_EPAYCO = true;
export const DOCUMENT_TYPES = {
  cedula: "Cédula de Ciudadanía",
  cedulaExtranjeria: "Cédula de Extranjería",
  pasaporte: "Pasaporte",
  dni: "DNI",
  nit: "NIT",
  tarjetaIdentidad: "Tarjeta de identidad",
};

export const CIVIL_STATUS = {
  "Soltero(a)": "Soltero(a)",
  "Casado(a)": "Casado(a)",
  "Separado(a)": "Separado(a)",
  "Divorciado(a)  ": "Divorciado(a) ",
  "Viudo(a)": "Viudo(a)",
};

export const OCCUPATION = {
  "Empleado(a)": "Empleado(a)",
  "Desempleado(a)": "Desempleado(a)",
  "Empresario(a)": "Empresario(a)",
  "Pensionado(a)": "Pensionado(a)",
  "Jubilado(a)": "Jubilado(a)",
  "Autoempleado(a)/Emprendedor(a)": "Autoempleado(a)/Emprendedor(a)",
};

export const EDUCATIONAL_LEVEL = {
  Primaria: "Primaria",
  Bachiller: "Bachiller",
  Técnico: "Técnico",
  Tecnólogo: "Tecnólogo",
  Profesional: "Profesional",
  Especialización: "Especialización",
  Maestría: "Maestría",
  Doctorado: "Doctorado",
};

export const HOW_DID_YOU_HEAR_ABOUT_US = {
  "facebook-instagram-ad": "Anuncio Facebook / Instagram",
  "youtube-ad": "Anuncio YouTube",
  referral: "Referido",
  influencer: "Influencer - Youtuber",
};

export const CONTRACT_TYPES = {
  mortgage: "Con Hipoteca",
  standard: "Sin Hipoteca",
};

export const DEV_FORMS = [
  {
    fullname: "May Kap",
    id_type: "cedula",
    id_number: "AT374743",
    id_location_expedition: "Atlantis",
    birthdate: "1993-01-21T04:00:00.000Z",
    email: "maykap@yopmail.com",
    cellphone: "573000000001",
    nationality: "063",
    country_of_residence: "063",
    cod_municipio: "Buenos Aires",
    residence_neighborhood: "Sample",
    address_residence: "Sample",
    civil_status: "Soltero(a)",
    education_level: "Profesional",
    he_has_children: "No",
    he_has_children_count: "1",
    occupation: "Pensionado(a)",
    profession: "Sample",
    economy_activity: "Sample",
    monthly_income: "10,000,000",
    how_did_you_hear_about_us: "Anuncio Facebook / Instagram",
    user_id_bank: 1,
    user_bank_account_type: 1,
    user_bank_account_number: "2423423434",
    does_account_belong_to_holder: "Yes",
    full_name_of_account_holder: "",
    account_holder_document_type: "-",
    document_number_of_the_account_holder: "",
    beneficiary_fullname: "Alaska Nebraska",
    email_beneficiary: "alaska@yopmail.com",
    beneficiary_id_number: "Sample",
    beneficiary_id_type: "cedula",
    cellphone_beneficiary: "573000000002",
    beneficiary_id_location_expedition: "New York",
    country_of_residence_beneficiary: "249",
    cod_municipio_beneficiary: "Sample",
    address_residence_beneficiary: "Sample",
    civil_status_beneficiary: "Separado(a)",
    economy_activity_beneficiary: "Empresario",
  },
];

export const VERIFIK_DOCUMENTS = {
  CC: {
    for: [
      "disciplinary-records-procuraduria",
      "police-background-check",
      "police-enforcement-corrective-measures",
      "international-criminal-records",
    ],
    label: "Cedula de Ciudadanía",
  },
  CE: {
    for: [
      "disciplinary-records-procuraduria",
      "police-background-check",
      "police-enforcement-corrective-measures",
      "international-criminal-records",
    ],
    label: "Cedula de Extranjería",
  },
  PEP: {
    for: ["disciplinary-records-procuraduria", "international-criminal-records"],
    label: "Pasaporte",
  },
  PA: {
    for: ["international-criminal-records"],
    label: "Permiso de Asistencia",
  },
  RC: {
    for: ["international-criminal-records"],
    label: "Registro Civil",
  },
  CCVE: {
    for: ["international-criminal-records"],
    label: "Cuenta Corriente Virtual",
  },
  NIT: {
    for: ["international-criminal-records"],
    label: "NIT",
  },
  CURP: {
    for: ["international-criminal-records"],
    label: "CURP",
  },
  DNI: {
    for: ["international-criminal-records"],
    label: "DNI",
  },
  CCEC: {
    for: ["international-criminal-records"],
    label: "Cuenta Corriente Electroconmutador",
  },
};

export const VERIFIK_INTERNATIONAL = {
  // dea: "DEA",
  interpol: "Interpol",
};

export const TRANSACTION_TYPES = {
  pay: "Pago",
  revenue: "Ganancia",
  withdrawal: "Retiro",
};


export const noShowAppointmentsList = [
  {
    completeName: "Juan Pérez",
    email: "juan@example.com",
    date: "2024-04-14",
    source: "facebook",
    phoneNumber: "+1 1234567890",
    lastAppointment: "2024-04-13",
    status: "No-Show",
    link: "2024-04-15"
  },
  {
    completeName: "María García",
    email: "maria@example.com",
    date: "2024-04-15",
    source: "whatsapp",
    phoneNumber: "+1 2345678901",
    lastAppointment: "2024-04-14",
    status: "No-Show",
    link: "2024-04-16"
  },
  {
    completeName: "Elena Rodríguez",
    email: "elena@example.com",
    date: "2024-04-22",
    source: "web",
    phoneNumber: "+1 3456789012",
    lastAppointment: "2024-04-21",
    status: "No-Show",
    link: "2024-04-23"
  },
  {
    completeName: "David López",
    email: "david@example.com",
    date: "2024-04-23",
    source: "excel",
    phoneNumber: "+1 4567890123",
    lastAppointment: "2024-04-22",
    status: "No-Show",
    link: "2024-04-24"
  },
];

export const guestAttendeesList = [
  {
    completeName: "Carlos López",
    email: "carlos@example.com",
    date: "2024-04-16",
    source: "facebook",
    phoneNumber: "+1 5678901234",
    lastAppointment: "2024-04-15",
    status: "Available",
    link: "2024-04-17"
  },
  {
    completeName: "Laura Martínez",
    email: "laura@example.com",
    date: "2024-04-17",
    source: "excel",
    phoneNumber: "+1 6789012345",
    lastAppointment: "2024-04-16",
    status: "Available",
    link: "2024-04-18"
  },
  {
    completeName: "Mario Martínez",
    email: "mario@example.com",
    date: "2024-04-25",
    source: "whatsapp",
    phoneNumber: "+1 7890123456",
    lastAppointment: "2024-04-24",
    status: "Available",
    link: "2024-04-26"
  },
];

export const accountsWithoutInvitesList = [
  {
    completeName: "Pedro Rodríguez",
    email: "pedro@example.com",
    date: "2024-04-18",
    source: "web",
    phoneNumber: "+1 8901234567",
    lastAppointment: "2024-04-17",
    status: "Available",
    link: "2024-04-19"
  },
];

export const completedPurchasesList = [
  {
    completeName: "Luisa Fernández",
    email: "luisa@example.com",
    date: "2024-04-20",
    source: "excel",
    phoneNumber: "+1 9012345678",
    lastAppointment: "2024-04-19",
    status: "Available",
    link: "2024-04-21"
  },
  {
    completeName: "Javier Gómez",
    email: "javier@example.com",
    date: "2024-04-21",
    source: "facebook",
    phoneNumber: "+1 1234567890",
    lastAppointment: "2024-04-20",
    status: "Available",
    link: "2024-04-22"
  },
  {
    completeName: "Laura Pérez",
    email: "laura@example.com",
    date: "2024-04-28",
    source: "web",
    phoneNumber: "+1 2345678901",
    lastAppointment: "2024-04-27",
    status: "Available",
    link: "2024-04-29"
  },
  {
    completeName: "Juan García",
    email: "juan@example.com",
    date: "2024-04-29",
    source: "whatsapp",
    phoneNumber: "+1 3456789012",
    lastAppointment: "2024-04-28",
    status: "Available",
    link: "2024-04-30"
  },
];
