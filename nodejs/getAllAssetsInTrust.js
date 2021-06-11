const express = require('express')
const router = express.Router();
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();

router.post('/getAllAssetsInTrust', function (req, res) {
    console.log("Inside get AllAssets In Trust");
    var reqData = req.body;
    var assetId = reqData.assetId;
    if (assetId == undefined || assetId == null) {
        res.json({ response: "unsuccessful" });
    }
    else {
        contractInstance.getAllAssetsInTrust(assetId, { from: investor, gas: 3000000 }, (error, value) => {
            console.log("Inside contract method-getAllAssetsInTrust: " + value);
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