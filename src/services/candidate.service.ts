import { requestType } from ".";

export const candidateService = {
  list: (): Promise<any> => requestType.get("/api/candidates"),
  details: (code: string): Promise<any> =>
    requestType.get(`/api/candidates/${code}`),
  create: (user: any): Promise<any> =>
  requestType.post(`/api/candidates`, user),
  update: (user: any): Promise<any> =>
    requestType.put(`/api/candidates`, user),
  delete: (user: any): Promise<any> =>
    requestType.del(`/api/candidates`, user),
};
