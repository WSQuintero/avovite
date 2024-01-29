import axios from "axios";
import { handleCall } from "../utilities";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  contract: {
    async delete({ token }) {
      return await handleCall(async () => (await axios.delete(`${API_URL}/contracts/cancellation`, { params: { token } })).data);
    },
  },
};
