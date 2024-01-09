import axios from "axios";
import { handleCall } from "../utilities";

export default class SupplierService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });
  }
  async get({ id = null } = {}) {
    return await handleCall(
      async () => (id ? await this.axios.get(`${this.API_URL}/suppliers/${id}`) : await this.axios.get(`${this.API_URL}/suppliers`)).data
    );
  }
  async add({ id, ...body } = {}) {
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/suppliers`, body)).data);
  }
  async update({ id, ...body } = {}) {
    return await handleCall(async () => (await this.axios.put(`${this.API_URL}/suppliers/${id}`, body)).data);
  }
  async delete({ id }) {
    return await handleCall(async () => (await this.axios.delete(`${this.API_URL}/suppliers/${id}`)).data);
  }
}
