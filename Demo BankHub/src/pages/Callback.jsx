import axios from "axios";
import { useEffect } from "react";
import { baseURL } from "../constants";

const Callback = () => {
  useEffect(() => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const publicToken = urlParams.get("publicToken");
    if (publicToken) {
      axios
        .post(`${baseURL}/token`, {
          publicToken: publicToken,
        })
        .then((response) => {
          console.log(response.status);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const a = document.createElement("a");
    a.href = "/";
    a.click();
  }, []);
  return <div>Callback</div>;
};

export default Callback;
