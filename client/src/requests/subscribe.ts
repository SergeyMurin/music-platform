import axios from "axios";

export const createSubscribeAsync = async (id: string, token: string) => {
  return await axios.post(
    "http://localhost:5000/subscribe",
    {
      user_id: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const removeSubscribeAsync = async (id: string, token: string) => {
  return await axios.delete("http://localhost:5000/subscribe", {
    data: { user_id: id },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserSubscribersAsync = async (id: string) => {
  return await axios.get("http://localhost:5000/subscribe/subscribers", {
    data: { id },
  });
};

export const getUserSubscriptionsAsync = async (id: string) => {
  return await axios.get("http://localhost:5000/subscribe/subscriptions", {
    data: { id },
  });
};

export const getUserSubscribersAsyncQ = async (id: string) => {
  return await axios.get("http://localhost:5000/subscribe/subscribers", {
    params: { id },
  });
};

export const getUserSubscriptionsAsyncQ = async (id: string) => {
  return await axios.get("http://localhost:5000/subscribe/subscriptions", {
    params: { id },
  });
};
