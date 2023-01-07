import axiosInstance from '../../src/utils/axiosInstance';

const publisherRequests = {
  getWelcomeMessage: async () => {
    const data = await axiosInstance.get(
      `/strapi-plugin-generic-publisher/getWelcomeMessage`
    );
    return data;
  },
  getInstances: async () => {
    const data = await axiosInstance.get(
      `/strapi-plugin-generic-publisher/instances`
    );
    return data;
  },
  check: async (id) => {
    const data = await axiosInstance.post(
      `/strapi-plugin-generic-publisher/check`,
      {
        id: id,
      }
    );
    return data;
  },
  publish: async (id) => {
    const data = await axiosInstance.post(
      `/strapi-plugin-generic-publisher/publish`,
      {
        id: id,
      }
    );
    return data;
  },
  createPublisherComponent: async () => {
    const data = await axiosInstance.post(
      `/strapi-plugin-generic-publisher/createPublisherComponent`
    );
    return data;
  },
  fetchPublisherComponent: async () => {
    const data = await axiosInstance.get(
      `/strapi-plugin-generic-publisher/fetchPublisherComponent`
    );
    return data;
  },
};
export default publisherRequests;
