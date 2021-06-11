const express = require('express')
const router = express.Router();
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();

router.post('/buyToken', function (req, res) {
    var reqData = req.body;
    var sellId = reqData.sellId;
    var tokenReq = reqData.tokenReq;
    var date = reqData.date;
    var Date = date;

    var b = Date.slice(0, 10);
    var c = b.split('-');
    var e = c[Symbol.iterator]();
    year = (e.next().value);
    month = (e.next().value);
    day = (e.next().value);
    console.log(year, '----', month, '-----', day);

    console.log("Inside buyToken");
    contractInstance.buyToken(sellId, tokenReq, year, month, day, { from: investor, gas: 3000000 }, (error, value) => {
        console.log("Inside contract method-buyMoreToken: " + value);
        if (error) {
            console.log("error is " + error);
            res.json({ response: "unsuccessful" });
        }
        else {
            console.log("Inside contract method-buyMoreToken: " + result, value);
            res.json({ response: "successful" });
        }
    })
})

module.exports = router;