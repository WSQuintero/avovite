import axios from "axios";
import { handleCall } from "../utilities";

export default class UtilsService {
  constructor(token) {
    this.token = token;
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async getConstants() {
    return await handleCall(async () => {
      return (
        await axios.get(`${this.API_URL}/mastertables`, {
          headers: {
            Authorization: this.token,
          },
        })
      ).data;
    });
  }
}
