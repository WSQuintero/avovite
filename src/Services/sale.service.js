import axios from "axios";
import { handleCall } from "../utilities";

export default class SaleService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });
  }
  async sell(body) {
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/saleOfVite`, body)).data);
  }
  async request(body) {
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/shipping_of_vites`, body)).data);
  }
}
