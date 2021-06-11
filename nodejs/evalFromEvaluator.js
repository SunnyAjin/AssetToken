const express = require('express')
const router = express.Router();
const web3Config=require("./web3Config");
const contractInstance=web3Config.contractInstance();

router.post('/evalFromEvaluator',function(req,res){

    console.log("Inside evaluation by Evaluator");

    var reqData=req.body;
    console.log("request data: "+JSON.stringify(reqData))

    var assetId=reqData.assetId;   
    var evaluatedPrice=reqData.evaluatedPrice; 

    if(assetId==undefined||assetId==null||evaluatedPrice==undefined||evaluatedPrice==null){
        res.json({response:"unsuccessful"});
    }
    else{
        contractInstance.evaluateFromEvaluator(assetId,evaluatedPrice,{ from: web3Config.web3.eth.accounts[3], gas:3000000},(error,value)=>{
            console.log("Inside contract method-evaluateFromEvaluator: "+value);
            if(error)
            {
                console.log("error is "+error);
                res.json({response:"unsuccessful"});
            }
            else{
                res.json({response:"successful"});
            }
        })
    }
})

module.exports = router;