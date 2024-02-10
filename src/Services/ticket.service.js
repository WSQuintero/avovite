import axios from "axios";
import { handleCall } from "../utilities";

export default class TicketService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });
  }

  async create({
    title,
    description,
    ticketCategory,
    fullname,
    civilStatusBeneficiary,
    email,
    cellphone,
    id_number,
    id_location_expedition,
    cod_municipio_beneficiary,
    beneficiary_fullname,
    beneficiary_id_number,
    beneficiary_id_type,
    beneficiary_id_location_expedition,
    address_residence_beneficiary,
    email_beneficiary,
    cellphone_beneficiary,
    economy_activity_beneficiary,
    country_of_residence_beneficiary,
    files,
  }) {
    const body = {
      title,
      description,
      ticketCategory,
      fullname,
      email,
      cellphone,
      id_number,
      id_location_expedition,
      cod_municipio_beneficiary,
      beneficiary_fullname,
      beneficiary_id_number,
      beneficiary_id_type,
      beneficiary_id_location_expedition,
      address_residence_beneficiary,
      email_beneficiary,
      cellphone_beneficiary,
      civilStatusBeneficiary,
      economy_activity_beneficiary,
      country_of_residence_beneficiary,
      files,
    };
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/tickets`, body)).data);
  }

  async changeTicketStatus({ id, ticketStatus }) {
    const body = { ticketStatus };
    return await handleCall(async () => (await this.axios.put(`${this.API_URL}/tickets/change/ticketStatus/${id}`, body)).data);
  }

  async sendMessage({ message, ticketsId }) {
    const body = { message, ticketsId };
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/tickets/SendMessage`, body)).data);
  }

  async getAll() {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/tickets`)).data);
  }

  async getById({ id }) {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/tickets/${id}`)).data);
  }
}
