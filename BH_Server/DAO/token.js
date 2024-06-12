const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

let tokens;
module.exports = class TokenDAO {
  static async injectDB(conn) {
    if (tokens) {
      return;
    }
    try {
      tokens = await conn.db("tokens").collection("accessToken");
    } catch (error) {
      console.log("Unable to connect to database");
    }
  }
  static async addAccessToken(grantID, accessToken) {
    try {
      const data = {
        id: 1,
        grantID: grantID,
        accessToken: accessToken,
      };
      const currentTokens = await tokens.findOne({ id: 1 });
      if (currentTokens) {
        return await tokens.updateOne(
          { id: 1 },
          {
            $set: data,
          }
        );
      } else {
        return await tokens.insertOne(data);
      }
    } catch (e) {
      console.error(`Unable to save token: ${e}`);
      return { error: e };
    }
  }
  static async getToken() {
    try {
      return await tokens.findOne({ id: 1 });
    } catch (e) {
      console.error(`Unable to get token: ${e}`);
      return { error: e };
    }
  }
};
