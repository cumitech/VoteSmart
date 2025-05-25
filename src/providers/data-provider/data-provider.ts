"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";
import { API_URL, TOKEN_KEY } from "../../constant/api-url";
import axios from "axios";

export const API_URL_BASE = `${API_URL}/api`;

const axiosInstance = () => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "",
    };
  
    if (typeof window !== "undefined") {
      const token = JSON.parse(window.localStorage.getItem(TOKEN_KEY)!);
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
  
    return axios.create({
      headers,
    });
  };
  
  export const dataProvider = dataProviderSimpleRest(API_URL_BASE, axiosInstance());



