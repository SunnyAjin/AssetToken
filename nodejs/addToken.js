const express = require('express')
const router = express.Router();
const fs = require('fs');
const web3Config=require("./web3Config");
const contractInstance=web3Config.contractInstance();
var gasLimit=web3Config.getGasLimit();

router.post('/addToken',function(req,res){

    console.log("Inside add Token");

    var idFile=fs.readFileSync("ID.json","utf-8");
    idFile=JSON.parse(idFile);
    var idNo=idFile.tokenId;
    var tokenID="#T"+idNo;
    console.log("Token Id: "+tokenID);
//
    var reqData=req.body;
    console.log("request data: "+JSON.stringify(reqData))
    var insuranceID=reqData.insuranceID;
    var insuranceCategory=reqData.insuranceCategory;

    contractInstance.setInsurance(insuranceID,insuranceCategory,gasLimit,(error,value)=>{
        console.log("Inside contract method-value: "+value);
        if(error)
        {
            console.log("error is "+error);
        }
        else{
            res.send({response:"Insurance added"});
            idNo++;
            console.log("Next IoT id: "+idNo);
            idFile.insuranceID=idNo;
            var fileData=JSON.stringify(idFile);
            fs.writeFileSync("identity.json",fileData);
        }

    })

})

module.exports = router;