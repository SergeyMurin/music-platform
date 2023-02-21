import axios from "axios";
import { Constants } from "../constants";

export const createSubscribeAsync = async (
  id: string,
  token: string
): Promise<any> => {
  return await axios.post(
    "${Constants.server_uri}/subscribe",
    {
      user_id: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const removeSubscribeAsync = async (
  id: string,
  token: string
): Promise<any> => {
  return await axios.delete(`${Constants.server_uri}/subscribe`, {
    data: { user_id: id },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserSubscribersAsync = async (id: string): Promise<any> => {
  return await axios.get(`${Constants.server_uri}/subscribe/subscribers`, {
    params: { id },
  });
};

export const getUserSubscriptionsAsync = async (id: string): Promise<any> => {
  return await axios.get(`${Constants.server_uri}/subscribe/subscriptions`, {
    params: { id },
  });
};
