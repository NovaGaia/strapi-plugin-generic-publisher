import { getPluginEndpointURL } from "./getPluginEndpointURL";
import { request } from "@strapi/helper-plugin";

export const requestPluginEndpoint = (endpoint, data) => {
  const url = getPluginEndpointURL(endpoint);
  return request(url, data);
};
