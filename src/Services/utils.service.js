import axios from "axios";
import { handleCall } from "../utilities";

export default class UtilsService {
  constructor() {
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async getConstants() {
    return await handleCall(async () => {
      return (await axios.get(`${this.API_URL}/mastertables`)).data;
    });
  }

  async getLocation({ countryCode = null, stateCode = null } = {}) {
    return await handleCall(
      async () =>
        (countryCode
          ? await axios.get(`${this.API_URL}/deptos/${countryCode}`)
          : stateCode
          ? await axios.get(`${this.API_URL}/mupios/${stateCode}`)
          : await axios.get(`${this.API_URL}/paises`)
        ).data
    );
  }
}
