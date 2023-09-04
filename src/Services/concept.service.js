import axios from "axios";
import { handleCall } from "../utilities";

export default class PostService {
  constructor(token) {
    this.token = token;
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
    this.config = { headers: { Authorization: this.token } };
  }

  async get({ id = null } = {}) {
    return await handleCall(async () => {
      if (id) {
        return (await axios.get(`${this.API_URL}/profit-concepts/${id}`, this.config)).data;
      } else {
        return (await axios.get(`${this.API_URL}/profit-concepts`, this.config)).data;
      }
    });
  }

  async add({ id, ...body }) {
    return await handleCall(async () => (await axios.post(`${this.API_URL}/profit-concepts`, body, this.config)).data);
  }

  async update({ id, ...body }) {
    const { title, description } = body;
    return await handleCall(
      async () => (await axios.put(`${this.API_URL}/profit-concepts/${id}`, { title, description }, this.config)).data
    );
  }

  async delete({ id }) {
    return await handleCall(
      async () => (await axios.delete(`${this.API_URL}/profit-concepts/${id}`, this.config)).data
    );
  }
}
