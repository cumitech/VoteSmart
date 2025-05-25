import { useOne, type AuthProvider } from "@refinedev/core";
import { TOKEN_KEY, USER_DATA } from "../../constant/api-url";
import { userService } from "../../services/user.service";
import { authService } from "../../services/auth.service";
import Cookies from "js-cookie";

export const useAuthProvider = () => {
  const authProvider: AuthProvider = {
    login: async ({ matricule, password }) => {
      try {
        const response = await authService.login({ matricule, password });
        const user = response.data;
        if (user) {
          Cookies.set("auth", JSON.stringify(user), {
            expires: 30, // 30 days
            path: "/dashboard",
          });
          localStorage.setItem(TOKEN_KEY, JSON.stringify(user.token));
          localStorage.setItem(USER_DATA, JSON.stringify(user.user));

          let redirectTo = "/dashboard";

          if (user.role === "voter" || user.role === "candidate") {
            redirectTo = "/votes";
          }
          return {
            success: true,
            redirectTo,
          };
        }

        return response.data.user;
      } catch (error: any) {
        const { message } = error.response.data;
        return {
          success: false,
          error: {
            name: "LoginError",
            message,
          },
        };
      }
    },
    register: async ({
      matricule,
      name,
      password,
      faculty_id,
    }): Promise<any> => {
      try {
        const response = await userService.create({
          matricule,
          password,
          name,
          role: "voter",
          faculty_id,
        });
        const user = response.data;

        if (user) {
          return {
            success: true,
            redirectTo: "/login",
          };
        }
      } catch (error: any) {
        const { message } = error.response.data;
        return {
          success: false,
          error: {
            name: "Registration Error",
            message,
          },
        };
      }
    },
    logout: async () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_DATA);
      Cookies.remove("auth", { path: "/" });
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    check: async () => {
      const token = JSON.parse(window.localStorage.getItem(TOKEN_KEY)!);
      if (token) {
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
    getPermissions: async () => {
      const user = JSON.parse(window.localStorage.getItem(USER_DATA)!);
      if (user) {
        return user.role;
      }
      return null;
    },
    getIdentity: () => {
      const token = JSON.parse(window.localStorage.getItem(TOKEN_KEY)!);
      const user = JSON.parse(window.localStorage.getItem(USER_DATA)!);
      if (token) {
        return user;
      }
      return null;
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return { error };
    },
  };

  return {
    authProvider,
  };
};
