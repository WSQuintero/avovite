import axios from "axios";
import { handleCall } from "../utilities";

export default class ShopService {
  constructor(token) {
    this.token = token;
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async get({ id = null } = {}) {
    return await handleCall(async () => {
      if (id) {
        return (await axios.get(`${this.API_URL}/services/${id}`, { headers: { Authorization: this.token } })).data;
      } else {
        return (await axios.get(`${this.API_URL}/services`, { headers: { Authorization: this.token } })).data;
      }
    });
  }

  async add({ id, ...body }) {
    return await handleCall(
      async () => (await axios.post(`${this.API_URL}/blog`, body, { headers: { Authorization: this.token } })).data
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
