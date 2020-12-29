import axios from "axios";

const instance = axios.create({
  baseURL: "https://factadmin-6b2ac-default-rtdb.firebaseio.com/",
});

export default instance;
