const express = require("express");
const { getPublicToken, getAccessToken, getRecordDetail } = require("../controllers/token");

const router = express.Router();

// router.route('/').get((req,res)=>{
//     res.send("Hello user")
// })
router.route("/").get(getPublicToken).post(getAccessToken)
router.route("/detail").get(getRecordDetail)
module.exports = router;
