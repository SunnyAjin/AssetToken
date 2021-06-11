const express = require('express')
const router = express.Router();
const web3Config=require("./web3Config");
const contractInstance=web3Config.contractInstance();
var gasLimit=web3Config.getGasLimit();

router.post('/getWallet',function(req,res){

    console.log("Inside get Wallet");

    var reqData=req.body;
    console.log("request data: "+JSON.stringify(reqData));

    // address investor;
    // uint purchasePrice;
    // uint totalTokenHolding;
    // uint currentPrice;
    // uint investmentReturn;

    var address=reqData.address;
    var purchasePrice;   
    var totalTokenHolding;
    var currentPrice;
    var investmentReturn;

    if(address==undefined){
        res.json({response:"unsuccessful"});
    }
    else{
        contractInstance.setInsurance(address,gasLimit,(error,value)=>{
            console.log("Inside contract method-value: "+value);
            if(error)
            {
                console.log("error is "+error);
                res.json({response:"unsuccessful"});
            }
            else{
                res.json({response:"Inventor added"});
            }
        })
    }
})

module.exports = router;