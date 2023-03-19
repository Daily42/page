import axios from "axios";
import store from "../../redux/store";
import { AuthData, setAuth } from "../../redux/slices/auth";

export const backendSite = "http://daily42-env.eba-dmbiy4zs.ap-northeast-2.elasticbeanstalk.com";

export const instance = axios.create({
  baseURL: backendSite,
  timeout: 5000,
  withCredentials: true
});

export default instance;
