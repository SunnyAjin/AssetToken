const express = require('express')
const router = express.Router();
const web3Config = require("./web3Config");
const contractInstance = web3Config.contractInstance();
var gasLimit = web3Config.getGasLimit();

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(" http://127.0.0.1:9545"));//ganache

router.post('/addInvestor', function (req, res) {

    console.log("Inside add Investor");

    var reqData = req.body;
    console.log("request data: " + JSON.stringify(reqData))

    var address = web3Config.web3.personal.newAccount("1234");

    var name = reqData.name;
    var password = reqData.password;
    var email = reqData.email;
    var bankAccount = reqData.bankAccount;
    var phone = reqData.phone;
    var gender = reqData.gender;
    console.log("address", address)

    if (address == undefined || address == null || name == undefined || name == null || password == undefined || password == null || email == undefined || email == null || bankAccount == undefined || bankAccount == null || phone == undefined || phone == null || gender == undefined || gender == null) {
        res.json({ response: "unsuccessful" });
    }
    else {
        contractInstance.addUser(address, name, password, email, bankAccount, phone, gender, gasLimit, { from: web3.eth.accounts[0], gas: 3000000 }, (error, value) => {
            console.log("Inside contract method-addUser: " + value);
            if (error) {
                console.log("error is " + error);
                res.json({ response: "unsuccessful" });
            }
            else {
                res.json({ response: "Inventor added", Address: address });
            }
        })
    }
})

module.exports = router;