const express = require('express')
const router = express.Router();
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();

router.post('/sellToken', function (req, res) {
    console.log("Inside sellToken");
    var reqData = req.body;
    var sellId = reqData.sellId;
    var assetId = reqData.assetId;
    var tokenReq = reqData.tokenReq;
    if (assetId == undefined || assetId == null || sellId == undefined || sellId == null || tokenReq == undefined || tokenReq == null) {
        res.json({ response: "unsuccessful" });
    }
    else {
        contractInstance.sellToken(sellId, assetId, tokenReq, { from: investor, gas: 3000000 }, (error, value) => {
            console.log("Inside contract method-sellToken: " + value);
            if (error) {
                console.log("error is " + error);
                res.json({ response: "unsuccessful" });
            }
            else {
                console.log("success");
                console.log("value", value)
                res.json({ response: "successful", data: value });
            }
        })
    }
})

module.exports = router;