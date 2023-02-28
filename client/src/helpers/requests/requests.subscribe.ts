import axios from "axios";
import { ClientConfig } from "../../client.config";

export const createSubscribeAsync = async (
  id: string,
  token: string
): Promise<any> => {
  const response = await axios.post(
    `${ClientConfig.server_uri}/subscribe`,
    {
      user_id: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const removeSubscribeAsync = async (
  id: string,
  token: string
): Promise<any> => {
  return await axios.delete(`${ClientConfig.server_uri}/subscribe`, {
    data: { user_id: id },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserSubscribersAsync = async (id: string): Promise<any> => {
  return await axios.get(`${ClientConfig.server_uri}/subscribe/subscribers`, {
    params: { id },
  });
};

export const getUserSubscriptionsAsync = async (id: string): Promise<any> => {
  return await axios.get(`${ClientConfig.server_uri}/subscribe/subscriptions`, {
    params: { id },
  });
};
