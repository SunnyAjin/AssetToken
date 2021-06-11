const express = require('express')
const router = express.Router();
const fs = require('fs');
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();

router.post('/listSaleByInvestor', function (req, res) {

    console.log("Inside List Sale by Investor");
    var idFile = fs.readFileSync("ID.json", "utf-8");
    idFile = JSON.parse(idFile);
    var idNo = idFile.sellId;
    var sellID = "#S" + idNo;
    console.log("Token Id: " + sellID);

    var reqData = req.body;
    console.log("request data: " + JSON.stringify(reqData))

    var assetId = reqData.assetId;
    var listingValidTill = reqData.listingValidTill;
    var maxToken = reqData.maxToken;
    var minToken = reqdata.minToken;
    var askingPrice = reqData.askingPrice;
    var investor = reqData.address;
    var Date = listingValidTill;

    var b = Date.slice(0, 10);
    var c = b.split('-');
    var e = c[Symbol.iterator]();
    year = (e.next().value);
    month = (e.next().value);
    day = (e.next().value);
    console.log(year, '----', month, '-----', day);

    if (assetId == undefined || assetId == null || listingValidTill == undefined || listingValidTill == null || maxToken == undefined || maxToken == null || minToken == undefined || minToken == null || askingPrice == undefined || askingPrice == null || sellID == undefined || sellID == null || investor == undefined || investor == null) {
        res.json({ response: "unsuccessful" });
    }
    else {
        contractInstance.listSaleFromInvestor(assetId, year, month, day, maxToken, minToken, askingPrice, sellID, { from: investor, gas: 3000000 }, (error, value) => {
            console.log("Inside contract method-listSaleFromInvestor: " + value);
            if (error) {
                console.log("error is " + error);
                res.json({ response: "unsuccessful" });
            }
            else {
                res.json({ response: "successful", sellId: sellID });
                idNo++;
                console.log("Next Sell id no.: " + idNo);
                idFile.sellId = idNo;
                var fileData = JSON.stringify(idFile);
                fs.writeFileSync("ID.json", fileData);
            }
        })
    }
})

module.exports = router;