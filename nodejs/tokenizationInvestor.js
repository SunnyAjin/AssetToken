const express = require('express')
const router = express.Router();
const web3Config=require("./web3Config");
const contractInstance=web3Config.contractInstance();

router.post('/tokenizationInvestor',function(req,res){

    console.log("Inside token req by Investor");

    var reqData=req.body;
    console.log("request data: "+JSON.stringify(reqData))

    var investor=reqData.address;
    var assetId=reqData.assetId; 
    var total=reqData.total;   

    if(investor==undefined||investor==null||assetId==undefined||assetId==null||total==null||total==undefined){
        res.json({response:"unsuccessful"});
    }
    else{
        contractInstance.tokenFromInvestor(assetId,total,{ from: investor, gas:3000000},(error,value)=>{
            console.log("Inside contract method-tokenFromInvestor: "+value);
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