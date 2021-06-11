const express = require('express');
const router = express.Router();
const fs = require('fs');
const web3Config = require("./web3Config");
const multer = require('multer');
const spawn = require('child_process').spawn;
const contractInstance = web3Config.contractInstance();
var gasLimit = web3Config.getGasLimit();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage });

router.post('/addAssets', upload.single('file'), function (req, res) {

    console.log("Inside add assets");

    var idFile = fs.readFileSync("ID.json", "utf-8");
    idFile = JSON.parse(idFile);
    var idNo = idFile.assetId;
    var assetID = "#A" + idNo;
    console.log("Asset Id: " + assetID);

    var reqData = req.body;
    console.log("request data: " + JSON.stringify(reqData));
    var assetName = reqData.assetName;
    var assetType = reqData.assetType;
    var brand = reqData.brand;
    var purchasePrice = reqData.purchasePrice;
    var assetWeight = reqData.assetWeight;
    var description = reqData.description;
    var imageHash;
    var ownedDate = reqData.ownedDate;
    var owner = reqData.owner;
    var fileDetails = req.file;

    //file uploading to IPFS    
    console.log("File info: " + JSON.stringify(fileDetails));
    var file = __dirname + '/uploads/' + req.file.originalname;
    var ipfs = spawn('ipfs', ['add', file]);
    ipfs.stdout.on('data', (data) => {
        if (data) {
            console.log("Got Data!!")
            var output = data.toString().split(" ")
            imageHash = output[1];
            console.log("Hash: " + imageHash);

            if (AssetId == undefined || AssetId == null || assetName == undefined || assetName == null || assetType == undefined || assetType == null || brand == undefined || brand == null || purchasePrice == undefined || purchasePrice == null || assetWeight == undefined || assetWeight == null || description == undefined || description == null || imageHash == undefined || imageHash == null || ownedDate == undefined || ownedDate == null) {
                res.json({ "msg": "unsuccess" });
            }
            else {
                //contact fn
                contractInstance.addAsset(AssetId, assetName, assetType, brand, purchasePrice, assetWeight, description, imageHash, ownedDate, { from: owner, gas: 3000000 }, (error, value) => {
                    console.log("Inside contract method-addAsset: " + value);
                    if (error) {
                        console.log("error is " + error);
                        res.json({ "msg": "unsuccess" });
                    }
                    else {
                        idNo++;
                        console.log("Next asset id num: " + idNo);
                        idFile.assetId = idNo;
                        var fileData = JSON.stringify(idFile);
                        fs.writeFileSync("ID.json", fileData);
                        res.json({ "msg": "success" });
                    }

                })
            }

        }
    })

})

module.exports = router;