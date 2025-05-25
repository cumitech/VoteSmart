import axios from "axios";
import { API_URL } from "../constant/api-url";

const instance = axios.create({
  baseURL: API_URL, // Replace with your API server URL
});

export const authService = {
  register: async (user: any): Promise<any> =>
    await instance.post(`/register`, user),
  login: async (user: { matricule: string; password: string }): Promise<any> =>
    await instance.post("/login", user),
  logout: async (): Promise<any> => await instance.get("/logout"),
};
