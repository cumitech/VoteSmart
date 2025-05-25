import { requestType } from ".";

export const voteService = {
  list: (): Promise<any> => requestType.get("/api/votes"),
  details: (code: string): Promise<any> =>
    requestType.get(`/api/votes/${code}`),
  create: (user: any): Promise<any> =>
  requestType.post(`/api/votes`, user),
  update: (user: any): Promise<any> =>
    requestType.put(`/api/votes`, user),
  delete: (user: any): Promise<any> =>
    requestType.del(`/api/votes`, user),
};
