const express = require('express')
const router = express.Router();
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();

router.post('/buyMoreToken', function (req, res) {
    console.log("Inside buyMoreToken");

    var send = [];
    var array = contractInstance.buyMoreTokenArray.call();
    for (var i = 0; i < array.length; i++) {
        var result = contractInstance.buyMoreToken(parseInt(array[i]), { from: investor, gas: 3000000 }, (error, value) => {
            console.log("Inside contract method-buyMoreToken: " + value);
            if (error) {
                console.log("error is " + error);
                res.json({ response: "unsuccessful" });
            }
            else {
                console.log("Inside contract method-buyMoreToken: " + result, value);
                var json = {
                    assetId: value[0],
                    imageHash: value[1],
                    askingPrice: value[2],
                    sellId: value[3]
                }
                send.push(json);
            }
        })
    }
    res.json({ response: "successful", data: send });
})

module.exports = router;