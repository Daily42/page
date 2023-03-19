import axios from "axios";
import store from "../../redux/store";
import { AuthData, setAuth } from "../../redux/slices/auth";

export const backendSite = "http://daily42-env.eba-dmbiy4zs.ap-northeast-2.elasticbeanstalk.com";

export const instance = axios.create({
  baseURL: backendSite,
  timeout: 5000,
});

// instance.interceptors.response.use((response) => {
//   store.dispatch(setAuth({ auth: true } as AuthData));
//   return response;
// }, (error) => {
//   if (error.response.status === 401) {
//     store.dispatch(setAuth({ auth: false } as AuthData));
//   }
//   return Promise.reject(error);
// });

export default instance;
