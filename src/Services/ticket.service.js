import axios from "axios";
import { handleCall } from "../utilities";

export default class TicketService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });
  }

  async create({ ...body }) {
    // Verificar si hay archivos en la propiedad 'files'
    if (body.files && Array.isArray(body.files) && body.files.length > 0) {
      const formData = new FormData();

      // Crear un array para almacenar los archivos
      let files = [];

      // Verificar si 'files' es un array
      if (Array.isArray(body.files)) {
        files = body.files;
      } else {
        // Si 'files' es un solo archivo, agregarlo al array 'files'
        files.push(body.files);
      }

      // Eliminar la clave 'files' del body para evitar duplicados
      delete body.files;

      // Verificar si hay más de un archivo en el array 'files'
      if (files.length > 1) {
        // Si hay más de un archivo, agregarlos todos al FormData como un solo array 'files'
        files.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });
      } else if (files.length === 1) {
        // Si solo hay un archivo, agregarlo al FormData sin usar un array
        formData.append("files", files[0]);
      }

      // Agregar otros campos al FormData
      Object.entries(body).forEach(([key, value]) => {
        // Verificar si el valor no está vacío y no es la clave 'files'
        if (value !== undefined && value !== null && value !== "" && key !== "files") {
          // Agregar la clave y su valor al FormData
          formData.append(key, value);
        }
      });

      // Enviar la solicitud al backend
      return await handleCall(
        async () =>
          (
            await axios.post(`${this.API_URL}/tickets`, formData, {
              headers: {
                Authorization: this.token,
                "Content-Type": "multipart/form-data", // Especificar el tipo de contenido como FormData
              },
            })
          ).data
      );
    } else {
      // Si no hay archivos, enviar la información directamente sin FormData
      console.log("No hay archivos para enviar. Enviando los demás datos sin FormData.");
      console.log(body);

      // Eliminar la clave 'files' del body antes de enviar
      delete body.files;

      return await handleCall(
        async () =>
          (
            await axios.post(`${this.API_URL}/tickets`, body, {
              headers: {
                Authorization: this.token,
              },
            })
          ).data
      );
    }
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
