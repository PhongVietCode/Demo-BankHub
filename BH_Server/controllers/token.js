// const config = require("../constants/index");
const axios = require("axios");
const TokenDAO = require("../DAO/token");
require("dotenv").config();
const getPublicToken = (req, res) => {
  axios
    .post(
      "https://sandbox.bankhub.dev/grant/token",
      {
        scopes: "transaction",
        language: "vi",
        redirectUri: process.env["REACT_APP_BASEURL"],
      },
      {
        headers: {
          "x-client-id": process.env["REACT_APP_CLIENT_ID"],
          "x-secret-key": process.env["REACT_APP_SECRET_KEY"],
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const registerLink = `https://dev.link.bankhub.dev?grantToken=${response.data["grantToken"]}&redirectUri=${process.env["REACT_APP_BASEURL"]}&iframe=false`;
      res.send(registerLink);
    })
    .catch((error) => {
      res.send(error);
    });
};
const getAccessToken = (req, res) => {
  axios
    .post(
      "https://sandbox.bankhub.dev/grant/exchange",
      {
        publicToken: req.body.publicToken,
      },
      {
        headers: {
          "x-client-id": process.env["REACT_APP_CLIENT_ID"],
          "x-secret-key": process.env["REACT_APP_SECRET_KEY"],
          "Content-Type": "application/json",
        },
      }
    )
    .then(async (response) => {
      await TokenDAO.addAccessToken(
        response.data["grantId"],
        response.data["accessToken"]
      );
      res.status(200).json({ grantId: response.data["grantId"] });
    })
    .catch((error) => {
      res.send(error);
    });
};

const getRecordDetail = async (req, res) => {
  const info = await TokenDAO.getToken();
  const accessToken = info.accessToken;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://sandbox.bankhub.dev/transactions",
    headers: {
      "Accept": "application/json",
      "x-client-id": process.env["REACT_APP_CLIENT_ID"],
      "x-secret-key": process.env["REACT_APP_SECRET_KEY"],
      "Authorization": `${accessToken}`,
    },
  };

  axios(config)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      res.send(error)
    });
  // axios
  //   .get(`https://sandbox.bankhub.dev/transactions`, {
  //     headers: {
  //       "x-client-id": process.env["REACT_APP_CLIENT_ID"],
  //       "x-secret-key": process.env["REACT_APP_SECRET_KEY"],
  //       "Content-Type": "application/json",
  //       Authorization: `${accessToken}`,
  //     },
  //   })
  //   .then((response) => {
  //     console.log(response.body);
  //     res.send(response.body);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
};
module.exports = { getPublicToken, getAccessToken, getRecordDetail };
