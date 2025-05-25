import { requestType } from "./.";

export const userService = {
  list: (): Promise<any> => requestType.get("/api/users"),
  details: (code: string): Promise<any> =>
    requestType.get(`/api/users/${code}`),
  create: (user: any): Promise<any> =>
  requestType.post(`/api/users`, user),
  update: (user: any): Promise<any> =>
    requestType.put(`/api/users`, user),
  delete: (user: any): Promise<any> =>
    requestType.del(`/api/users`, user),
};
