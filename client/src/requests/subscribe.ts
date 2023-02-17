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
