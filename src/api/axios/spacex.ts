import axios from "axios";

interface SpaceXAPIParams {
    id?: boolean;
    limit?: number;
    offset?: number;
    sort?: string;
    order?: string;
}

const spacexAPI = axios.create({
  baseURL: "https://api.spacexdata.com/v3",
});

export const fetchLaunches = async (params: SpaceXAPIParams) => {
  params = { ...params, order: 'desc' }
  const res = await spacexAPI.get("/launches?" + new URLSearchParams(params as Record<string, string>));
  return res.data;
};
