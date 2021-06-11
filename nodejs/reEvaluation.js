const express = require('express')
const router = express.Router();
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();

router.post('/getAssetForReEvaluation', function (req, res) {
    console.log("Inside getAssetForReEvaluation");
    var reqData = req.body;
    var assetId = reqData.assetId;
    if (assetId == undefined || assetId == null) {
        res.json({ response: "unsuccessful" });
    }
    else {
        var value = contractInstance.getAssetForReEvaluation.call();
        console.log("value ", value)
        res.json({ response: "successful", data: value });
    }
})

router.post('/setReEvaluation', function (req, res) {
    console.log("Inside setReEvaluation");
    var reqData = req.body;
    var assetId = reqData.assetId;
    var newPrice = reqData.newPrice;

    if (assetId == undefined || assetId == null || newPrice == undefined || newPrice == null) {
        res.json({ response: "unsuccessful" });
    }
    else {
        contractInstance.setReEvaluation(assetId, newPrice, { from: investor, gas: 3000000 }, (error, value) => {
            console.log("Inside contract method-setReEvaluation: " + value);
            if (error) {
                console.log("error is " + error);
                res.json({ response: "unsuccessful" });
            }
            else {
                console.log("in node", value);
                let status = web3.eth.getTransactionReceipt(value).status;
                console.log(status);
                if (status == 0x1) {
                    console.log("success");
                    res.json({ response: "successful" });
                }
            }

        })
    }
})

module.exports = router;