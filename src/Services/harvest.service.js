import axios from "axios";
import { handleCall } from "../utilities";

export default class HarvestService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });
  }
  async get({ id = null } = {}) {
    return await handleCall(
      async () => (id ? await this.axios.get(`${this.API_URL}/harvest/${id}`) : await this.axios.get(`${this.API_URL}/harvest`)).data
    );
  }
  async add({ id, ...body } = {}) {
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/harvest`, body)).data);
  }
  async update({ id, ...body } = {}) {
    return await handleCall(async () => (await this.axios.put(`${this.API_URL}/harvest/${id}`, body)).data);
  }
  async delete({ id }) {
    return await handleCall(async () => (await this.axios.delete(`${this.API_URL}/harvest/${id}`)).data);
  }
}
