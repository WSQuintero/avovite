import axios from "axios";
import { handleCall } from "../utilities";

export default class MovementService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });
  }

  async get({ page = 1, pagezise = 10 }) {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/movements?page=${page}&pagezise=${pagezise}`)).data);
  }

  async reset(id) {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/movements/reset/${id}`)).data);
  }
  async withdrawal(id) {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/movements/aproveed/${id}`)).data);
  }
  async changeInformationBank(info, id) {
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/movements/changeinformationbanck/${id}`, info)).data);
  }
  async exportByDate({ initDate, finalDate }) {
    return await handleCall(async () => {
      if (initDate && finalDate) {
        // Corrección en la condición
        try {
          const response = await axios.get(
            `${this.API_URL}/contract-transactional-payments/expor/xlsx/?dateat=${initDate}&dateend=${finalDate}`,
            {
              responseType: "blob",
              headers: { Authorization: this.token }, // Agregar el token a las cabeceras
            }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `archivo.xlsx`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error("Error al descargar el archivo:", error);
        }
      }
    });
  }
  async exportByDateEpayco({ initDate, finalDate, limit, page }) {
    return await handleCall(async () => {
      if (initDate && finalDate) {
        try {
          const response = await axios.get(
            `${this.API_URL}/contracts/export/xlsx/epayco?transactionInitialDate=${initDate}&transactionEndDate=${finalDate}&page=${page}&limit=${limit}`,
            {
              responseType: "blob",
              headers: { Authorization: this.token }, // Agregar el token a las cabeceras
            }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `archivo.xlsx`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error("Error al descargar el archivo:", error);
        }
      }
    });
  }
  async exportByDateMovements({ initDate, finalDate }) {
    return await handleCall(async () => {
      if (initDate && finalDate) {
        // Corrección en la condición
        try {
          const response = await axios.get(`${this.API_URL}/movements/export/xlsx/?dateat=${initDate}&dateend=${finalDate}`, {
            responseType: "blob",
            headers: { Authorization: this.token }, // Agregar el token a las cabeceras
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `archivo.xlsx`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error("Error al descargar el archivo:", error);
        }
      }
    });
  }
}
