const express = require('express')
const router = express.Router();
const web3Config=require("./web3Config");
const contractInstance=web3Config.contractInstance();

router.post('/tokenizationByTrust',function(req,res){

    console.log("Inside tokenization by Trust");

    var reqData=req.body;
    console.log("request data: "+JSON.stringify(reqData))

    var assetId=reqData.assetId;

    if(assetId==undefined||assetId==null){
        res.json({response:"unsuccessful"});
    }
    else{
        contractInstance.tokenFromTrust(assetId,{ from: web3Config.web3.eth.accounts[4], gas:3000000},(error,value)=>{
            console.log("Inside contract method-tokenFromTrust: "+value);
            if(error)
            {
                console.log("error is: "+error);
                res.json({response:"unsuccessful"});
            }
            else{
                res.json({response:"successful"});
            }
        })
    }
})

module.exports = router;