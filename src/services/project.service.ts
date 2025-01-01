import { http } from "./Config";

export const projectService = {
  getAllProject: () => {
    return http.get("/Project/getAllProject");
  },
  createProject: (data: string) => {
    return http.post("/Project/createProject", data);
  },
};
