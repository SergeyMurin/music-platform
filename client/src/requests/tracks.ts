import axios from "axios";

export const getProfileTracksAsync = async (id: string) => {
  return axios.get("http://localhost:5000/track/all", { params: { id } });
};

export const fetchTrackInfo = async (id: string) => {
  const response = await axios.get("http://localhost:5000/track", {
    params: { id },
  });
  return response.data;
};

export const fetchTrackGenres = async (id: string) => {
  const response = await axios.get("http://localhost:5000/genre-track", {
    params: { id },
  });
  return response.data;
};

export const fetchTrackTags = async (id: string) => {
  const response = await axios.get("http://localhost:5000/tag-track", {
    params: { id },
  });
  return response.data;
};
