import axios from "axios";
import { handleCall } from "../utilities";

export default class MovementService {
  constructor(token = null) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.axios = axios.create({ headers: { Authorization: this.token } });
  }
  async get() {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/movements`)).data);
  }
  async withdrawal(id) {
    return await handleCall(async () => (await this.axios.get(`${this.API_URL}/movements/aproveed/${id}`)).data);
  }
  async changeInformationBank(info, id) {
    return await handleCall(async () => (await this.axios.post(`${this.API_URL}/movements/changeinformationbanck/${id}`, info)).data);
  }
}
