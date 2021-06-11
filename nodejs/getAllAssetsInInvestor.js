const express = require('express')
const router = express.Router();
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();

router.post('/getAssetTokens', function (req, res) {
    console.log("Inside get Asset Tokens");

    var send = [];
    if (assetId == undefined || assetId == null) {
        res.json({ response: "unsuccessful" });
    }
    else {
        var array = contractInstance.getAllAssetsInInvestor.call();
        for (var i = 0; i < array.length; i++) {
            var result = contractInstance.getAssetInInvestor(parseInt(array[i]), { from: investor, gas: 3000000 }, (error, value) => {
                console.log("Inside contract method-getAssetInInvestor: " + value);
                if (error) {
                    console.log("error is " + error);
                    res.json({ response: "unsuccessful" });
                }
                else {
                    console.log("Inside contract method-getAssetInInvestor: " + result, value);
                    var json = {
                        assetName: value[0],
                        assetType: value[1],
                        ownerName: value[2],
                        purchasePrice: value[3],
                        description: value[4],
                        assetWeight: value[5],
                        imageHash: value[6],
                        status: value[7],
                        assetId: value[8]
                    }
                    send.push(json);
                }
            })
        }
        res.json({ response: "successful", data: send });
    }
})

module.exports = router;