const express = require('express')
const router = express.Router();
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();

router.post('/getWallet1', function (req, res) {
    console.log("Inside getWallet1");
    var array = contractInstance.getWallet1.call();
    res.json({ response: "successful", data: array });
})

/****************************************************** */

router.post('/getWallet2', function (req, res) {
    console.log("Inside getWallet2");
    var reqData = req.body;
    var token = reqData.token;
    if (token == undefined || token == null) {
        res.json({ response: "unsuccessful" });
    }
    else {
        var value = contractInstance.getWallet2.call(token);
        res.json({ response: "successful", data: value });
    }
})

/****************************************************** */

router.post('/getWallet3', function (req, res) {
    console.log("Inside getWallet3");
    var reqData = req.body;
    var totalToken = reqData.totalToken;
    var token = reqData.token;

    if (totalToken == undefined || totalToken == null || token == undefined || token == null) {
        res.json({ response: "unsuccessful" });
    }
    else {
        contractInstance.getWallet3(totalToken, token, { from: investor, gas: 3000000 }, (error, value) => {
            console.log("Inside contract method-getWallet3: " + value);
            if (error) {
                console.log("error is " + error);
                res.json({ response: "unsuccessful" });
            }
            else {
                console.log("in node", value);
                let status = web3.eth.getTransactionReceipt(value).status;
                console.log(status);
                if (status == 0x1) {
                    console.log("success ", value);
                    res.json({ response: "successful", data: value });
                }
            }
        })
    }
})

module.exports = router;