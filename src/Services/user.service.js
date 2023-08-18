import axios from "axios";
import { handleCall } from "../utilities";

export default class AuthService {
  constructor(token = null) {
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
    this.token = token;

    this.config = { headers: { Authorization: this.token } };
  }

  async getProfits() {
    return await handleCall(async () => (await axios.get(`${this.API_URL}/users/profits`, this.config)).data);
  }
}
