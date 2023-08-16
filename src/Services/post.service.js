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

  async add({ id, ...body }) {
    return await handleCall(
      async () => (await axios.post(`${this.API_URL}/blog`, body, { headers: { Authorization: this.token } })).data
    );
  }

  async delete({ id, ...body }) {}

  async update({ id, ...body }) {}
}
