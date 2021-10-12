import axios from "axios";
import { history } from "../../index";

const client = axios.create();

client.defaults.baseURL = "http://localhost:3000";

client.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { status, data } = error.response;

        if (status === 401) {
            history.push("/addprofile");
        }

        return Promise.reject(error);
    }
);

export default client;
