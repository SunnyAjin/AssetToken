const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'));

const passionAbi = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "year",
                "type": "uint256"
            },
            {
                "name": "month",
                "type": "uint256"
            },
            {
                "name": "day",
                "type": "uint256"
            }
        ],
        "name": "timestampFromDate",
        "outputs": [
            {
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "addres",
                "type": "address"
            },
            {
                "name": "name",
                "type": "bytes32"
            },
            {
                "name": "password",
                "type": "bytes32"
            },
            {
                "name": "email",
                "type": "bytes32"
            },
            {
                "name": "bankAccount",
                "type": "uint256"
            },
            {
                "name": "phone",
                "type": "uint256"
            },
            {
                "name": "gender",
                "type": "bytes32"
            }
        ],
        "name": "addUser",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "assetId",
                "type": "bytes32"
            },
            {
                "name": "assetName",
                "type": "bytes32"
            },
            {
                "name": "assetType",
                "type": "bytes32"
            },
            {
                "name": "brand",
                "type": "bytes32"
            },
            {
                "name": "purchasePrice",
                "type": "uint256"
            },
            {
                "name": "assetWeight",
                "type": "uint256"
            },
            {
                "name": "description",
                "type": "string"
            },
            {
                "name": "imageHash",
                "type": "string"
            },
            {
                "name": "year",
                "type": "uint256"
            },
            {
                "name": "month",
                "type": "uint256"
            },
            {
                "name": "day",
                "type": "uint256"
            }
        ],
        "name": "addAsset",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "assetId",
                "type": "bytes32"
            }
        ],
        "name": "evaluateFromInvestor",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "assetId",
                "type": "bytes32"
            },
            {
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "evaluateFromEvaluator",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "assetId",
                "type": "bytes32"
            },
            {
                "name": "total",
                "type": "uint256"
            }
        ],
        "name": "tokenFromInvestor",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "assetId",
                "type": "bytes32"
            }
        ],
        "name": "tokenFromTrust",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "assetId",
                "type": "bytes32"
            },
            {
                "name": "year",
                "type": "uint256"
            },
            {
                "name": "month",
                "type": "uint256"
            },
            {
                "name": "day",
                "type": "uint256"
            },
            {
                "name": "maxToken",
                "type": "uint256"
            },
            {
                "name": "minToken",
                "type": "uint256"
            },
            {
                "name": "askingPrice",
                "type": "uint256"
            },
            {
                "name": "sellId",
                "type": "bytes32"
            }
        ],
        "name": "listSaleFromInvestor",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "buyMoreTokenArray",
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "sellId",
                "type": "bytes32"
            }
        ],
        "name": "buyMoreToken",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "sellId",
                "type": "bytes32"
            }
        ],
        "name": "viewMoreToken",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "sellId",
                "type": "bytes32"
            }
        ],
        "name": "buyDetails1",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "sellId",
                "type": "bytes32"
            }
        ],
        "name": "buyDetails2",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "sellId",
                "type": "bytes32"
            },
            {
                "name": "tokenReq",
                "type": "uint256"
            },
            {
                "name": "year",
                "type": "uint256"
            },
            {
                "name": "month",
                "type": "uint256"
            },
            {
                "name": "day",
                "type": "uint256"
            }
        ],
        "name": "buyToken",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "sellArray",
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "assetId",
                "type": "bytes32"
            }
        ],
        "name": "sellBeforeDetails",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "assetId",
                "type": "bytes32"
            }
        ],
        "name": "sellDetails2",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "sellId",
                "type": "bytes32"
            },
            {
                "name": "assetId",
                "type": "bytes32"
            },
            {
                "name": "tokenReq",
                "type": "uint256"
            }
        ],
        "name": "sellToken",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "investor",
                "type": "address"
            }
        ],
        "name": "getInvestor",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32[]"
            },
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "asset",
                "type": "bytes32"
            }
        ],
        "name": "getInvestorTokenDetails",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAllAssets",
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAllAssetsInInvestor",
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "asset",
                "type": "bytes32"
            }
        ],
        "name": "getAssetInInvestor",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "assetId",
                "type": "bytes32"
            }
        ],
        "name": "getTokenDetails",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "asset",
                "type": "bytes32"
            }
        ],
        "name": "getSaleDetails",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAssetTokenArray",
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "asset",
                "type": "bytes32"
            }
        ],
        "name": "getAssetTokens",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            },
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "asset",
                "type": "bytes32"
            },
            {
                "name": "investor",
                "type": "address"
            }
        ],
        "name": "getAssetToken",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "assetId",
                "type": "bytes32"
            },
            {
                "name": "year",
                "type": "uint256"
            },
            {
                "name": "month",
                "type": "uint256"
            },
            {
                "name": "day",
                "type": "uint256"
            }
        ],
        "name": "validatingInitialSale",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "sellId",
                "type": "bytes32"
            },
            {
                "name": "investor",
                "type": "address"
            }
        ],
        "name": "payBack",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "asset",
                "type": "bytes32"
            }
        ],
        "name": "getAssetForReEvaluation",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "asset",
                "type": "bytes32"
            },
            {
                "name": "newPrice",
                "type": "uint256"
            }
        ],
        "name": "setReEvaluation",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getWallet1",
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "token",
                "type": "bytes32"
            }
        ],
        "name": "getWallet2",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "totalToken",
                "type": "uint256"
            },
            {
                "name": "token",
                "type": "bytes32"
            }
        ],
        "name": "getWallet3",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

StoreContract = web3.eth.contract(passionAbi);
contractInstance = StoreContract.at('0x9efef88f6914b6234b82eb189e82fdfa51e82608');


web3.personal.unlockAccount(web3.eth.accounts[0], "1234");
var contractInstanc = function () {
    return contractInstance;
}
var unlockAccount = function () {
    web3.personal.unlockAccount(web3.eth.accounts[0], "1234");
}

var getGasLimit = function () {
    contractInstanc();
    unlockAccount();
    return ({ from: web3.eth.accounts[0], gas: 3000000 });
}

module.exports = {
    getGasLimit: getGasLimit,
    contractInstance: contractInstanc,
    web3: web3
}