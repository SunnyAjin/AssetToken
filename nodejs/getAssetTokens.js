const express = require('express')
const router = express.Router();
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();

router.post('/getAssetTokens', function (req, res) {
    console.log("Inside get Asset Tokens");

    var value = [];
    var array = contractInstance.getAssetTokenArray.call();
    for (var i = 0; i < array.length; i++) {
        var result = contractInstance.getAssetTokens(parseInt(array[i]))
        console.log("Inside contract method-getAssetTokens: " + result);
        var json = {
            investorsHoldingToken: result[0],
            assetID: result[1]
        }
        value.push(json);
    }
    res.json({ response: "successful", data: value });
})

module.exports = router;