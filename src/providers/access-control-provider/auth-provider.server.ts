import { AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";





export const authProviderServer: Pick<AuthProvider, "check" | "getIdentity"> = {
  check: async () => {
    const auth = Cookies.get("auth");

    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getIdentity: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      // Assuming 'auth' cookie contains user information in JSON format
      const user = JSON.parse(auth);

      return {
        ...user, // or any other user information you want to include
      };
    }

    return null; // or handle it accordingly if the user information is not found
  },
};