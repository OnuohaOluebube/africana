import Axios from "axios";
// const BASE_URL = "http://localhost:5000/";
const BASE_URL = "https://peaceful-sea-73946.herokuapp.com/";

const endPoints = {
  login: async (data) => {
    const response = await Axios.post(BASE_URL + "api/auth", data);
    return response.data;
  },

  signup: async (data) => {
    const response = await Axios.post(BASE_URL + "api/users", data);
    return response.data;
  },

  getCategories: async () => {
    const response = await Axios.get(BASE_URL + "api/categories");
    return response.data;
  },
  uploadToS3: async (file, s3url) => {
    const response = await Axios.put(s3url, file);
    return response.data;
  },

  getSignedS3Url: async () => {
    const response = await Axios.get(BASE_URL + "api/s3url");
    return response.data;
  },

  createImage: async (data) => {
    const headers = {
      "x-auth-token": localStorage.getItem("africanaToken"),
    };
    const response = await Axios.post(BASE_URL + "api/images", data, {
      headers,
    });
    return response.data;
  },

  getImages: async () => {
    const response = await Axios.get(BASE_URL + "api/images");
    return response.data;
  },
  getSignedinUser: async () => {
    const headers = {
      "x-auth-token": localStorage.getItem("africanaToken"),
    };
    const response = await Axios.get(BASE_URL + "api/users/me", {
      headers,
    });
    return response.data;
  },

  uploadImgs: async (data) => {
    const response = await Axios.post(BASE_URL + "uploadimages");
    return response.data;
  },
  likeImage: async (data) => {
    const headers = {
      "x-auth-token": localStorage.getItem("africanaToken"),
    };
    const response = await Axios.post(BASE_URL + "api/likes", data, {
      headers,
    });
    return response.data;
  },
};

export default endPoints;
