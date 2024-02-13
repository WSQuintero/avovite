import axios from "axios";
import { handleCall } from "../utilities";

export default class PostService {
  constructor(token) {
    this.token = token;
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async get({ id = null } = {}) {
    return await handleCall(async () => {
      if (id) {
        return (await axios.get(`${this.API_URL}/blog/${id}`, { headers: { Authorization: this.token } })).data;
      } else {
        return (await axios.get(`${this.API_URL}/blog`, { headers: { Authorization: this.token } })).data;
      }
    });
  }

  async add({ id, url_image, ...body }) {
    const formData = new FormData();

    // Agregar campos al FormData
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Agregar el archivo al FormData
    formData.append("url_image", url_image);

    // Enviar la solicitud al backend
    return await handleCall(
      async () =>
        (
          await axios.post(`${this.API_URL}/blog`, formData, {
            headers: {
              Authorization: this.token,
              "Content-Type": "multipart/form-data", // Especificar el tipo de contenido como FormData
            },
          })
        ).data
    );
  }

  async update({ id, ...body }) {
    const { title, description, url_image, url_video } = body;

    return await handleCall(
      async () =>
        (
          await axios.put(
            `${this.API_URL}/blog/${id}`,
            { title, description, url_image, url_video },
            { headers: { Authorization: this.token } }
          )
        ).data
    );
  }

  async delete({ id }) {
    return await handleCall(
      async () => (await axios.delete(`${this.API_URL}/blog/${id}`, { headers: { Authorization: this.token } })).data
    );
  }
}
