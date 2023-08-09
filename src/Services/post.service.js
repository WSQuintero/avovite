import axios from "axios";
import { handleCall } from "../utilities";

const dummies = [
  {
    id: "33c60621",
    image:
      "https://images.pexels.com/photos/3687927/pexels-photo-3687927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Granja de aguacates",
    description: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    id: "eae53c51",
    image:
      "https://images.pexels.com/photos/3687927/pexels-photo-3687927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Granja de aguacates",
    description: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    id: "bc60d238",
    image:
      "https://images.pexels.com/photos/3687927/pexels-photo-3687927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Granja de aguacates",
    description: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    id: "d7fd6f93",
    image:
      "https://images.pexels.com/photos/3687927/pexels-photo-3687927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Granja de aguacates",
    description: "Lorem ipsum dolor sit amet, consectetur",
  },
];

export default class PostService {
  constructor(token) {
    this.token = token;
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async get({ id = null } = {}) {
    return await handleCall(async () => {
      if (id) {
        return await new Promise((resolve) => resolve(dummies.find((post) => post.id === id)));
      } else {
        return await new Promise((resolve) => resolve(dummies));
      }
    });
  }
}
