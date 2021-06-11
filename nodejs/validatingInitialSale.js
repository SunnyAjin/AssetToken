const express = require('express')
const router = express.Router();
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();

router.post('/validatingInitialSale', function (req, res) {
    console.log("Inside validating Initial Sale");
    var reqData = req.body;
    var assetId = reqData.assetId;
    var currentDate = reqData.currentDate;
    if (assetId == undefined || assetId == null || currentDate == undefined || currentDate == null) {
        res.json({ response: "unsuccessful" });
    }
    else {
        contractInstance.validatingInitialSale(assetId, currentDate, { from: investor, gas: 3000000 }, (error, value) => {
            console.log("Inside contract method-validatingInitialSale: " + value);
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