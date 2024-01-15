import axios from "axios";
import { handleCall } from "../utilities";

export default class VerifikService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });
  }
  async search({ service, ...body } = {}) {
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/users/${service}`, body)).data);
  }
}
