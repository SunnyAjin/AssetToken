const express = require('express')
const router = express.Router();
const fs = require('fs');
const web3Config=require("./web3Config");
const contractInstance=web3Config.contractInstance();

router.post('/getMyAssetList',function(req,res){

    console.log("Inside Investor my asset list API");
    var list=fs.readFileSync("assetList.json","utf-8");
    list=JSON.parse(list);

    var reqData=req.body;
    console.log("request data: "+JSON.stringify(reqData))

    var investor=reqData.address; 

    if(investor==undefined||investor==null){
        res.json({response:"unsuccessful"});
    }
    else{
        contractInstance.evaluateFromEvaluator({ from: investor, gas:3000000},(error,value)=>{
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