import axios from "axios";
import { handleCall } from "../utilities";

export default class PaymentService {
  constructor(token) {
    this.API_URL = import.meta.env.VITE_API_URL;
    this.token = token;
    this.config = { headers: { Authorization: this.token } };
  }

  async validate({ ...body } = {}) {
    return await handleCall(
      async () => (await axios.post(`${this.API_URL}/payments/validate`, body, this.config)).data
    );
  }
}
