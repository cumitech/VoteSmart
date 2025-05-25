import { requestType } from ".";

export const electionService = {
  list: (): Promise<any> => requestType.get("/api/elections"),
  details: (code: string): Promise<any> =>
    requestType.get(`/api/elections/${code}`),
  create: (user: any): Promise<any> =>
  requestType.post(`/api/elections`, user),
  update: (user: any): Promise<any> =>
    requestType.put(`/api/elections`, user),
  delete: (user: any): Promise<any> =>
    requestType.del(`/api/elections`, user),
};
