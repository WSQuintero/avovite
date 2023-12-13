import axios from "axios";
import { handleCall } from "../utilities";

export default class ShopService {
  constructor(token) {
    this.token = token;
    this.API_URL = `${import.meta.env.VITE_API_URL}`;

    const config = { headers: { Authorization: this.token } };

    this.product = {
      get: async () => await handleCall(async () => (await axios.get(`${this.API_URL}/products`, config)).data),
      add: async ({ id, ...body }) =>
        await handleCall(async () => (await axios.postForm(`${this.API_URL}/products`, body, config)).data),
      update: async ({ id, ...body }) =>
        await handleCall(async () => (await axios.putForm(`${this.API_URL}/products/${id}`, body, config)).data),
      delete: async ({ id }) =>
        await handleCall(async () => (await axios.delete(`${this.API_URL}/products/${id}`, config)).data),
    };

    this.discount = {
      get: async () =>
        await handleCall(async () => (await axios.get(`${this.API_URL}/product-discounts`, config)).data),
      add: async ({ id, ...body }) =>
        await handleCall(async () => (await axios.postForm(`${this.API_URL}/product-discounts`, body, config)).data),
      update: async ({ id, ...body }) =>
        await handleCall(
          async () => (await axios.putForm(`${this.API_URL}/product-discounts/${id}`, body, config)).data
        ),
      delete: async ({ id }) =>
        await handleCall(async () => (await axios.delete(`${this.API_URL}/product-discounts/${id}`, config)).data),
    };

    this.coupon = {
      get: async () =>
        await handleCall(async () => (await axios.get(`${this.API_URL}/discountCode`, config)).data),
      add: async ({ id, ...body }) =>
        await handleCall(async () => (await axios.postForm(`${this.API_URL}/discountCode`, body, config)).data),
      update: async ({ id, ...body }) =>
        await handleCall(
          async () => (await axios.putForm(`${this.API_URL}/discountCode/${id}`, body, config)).data
        ),
      delete: async ({ id }) =>
        await handleCall(async () => (await axios.delete(`${this.API_URL}/discountCode/${id}`, config)).data),
    };

    this.shop = {
      get: async () =>
        await handleCall(async () => (await axios.get(`${this.API_URL}/product-discounts/shop`, config)).data),
    };
  }
}
