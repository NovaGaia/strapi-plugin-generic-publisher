import axiosInstance from '../../src/utils/axiosInstance';

const publisherRequests = {
  getWelcomeMessage: async () => {
    const data = await axiosInstance.get(`/nova-publisher/getWelcomeMessage`);
    return data;
  },
  getInstances: async () => {
    const data = await axiosInstance.get(`/nova-publisher/instances`);
    return data;
  },
  check: async (id) => {
    const data = await axiosInstance.post(`/nova-publisher/check`, {
      id: id,
    });
    return data;
  },
  publish: async (id) => {
    const data = await axiosInstance.post(`/nova-publisher/publish`, {
      id: id,
    });
    return data;
  },
  createPublisherComponent: async () => {
    const data = await axiosInstance.post(
      `/nova-publisher/createPublisherComponent`
    );
    return data;
  },
  fetchPublisherComponent: async () => {
    const data = await axiosInstance.get(
      `/nova-publisher/fetchPublisherComponent`
    );
    return data;
  },
};
export default publisherRequests;
