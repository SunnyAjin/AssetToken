const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const addAssets = require('./addAssets');
const addInvestors = require('./addInvestor');
const evalFromInvestor = require('./evalReqInvestor');
const evalFromEvaluator = require('./evalFromEvaluator');
const tokenizationInvestor = require('./tokenizationInvestor');
const tokenizationByTrust = require('./tokenizationByTrust');
const listSaleByInvestor = require('./listSaleByInvestor');
const listSaleByTrust = require('./listSaleByTrust');

//***************************************** */
const buyMoreToken = require('./buyMoreToken');
const buyToken = require('./buyToken');
const getAllAssetsInInvestor = require('./getAllAssetsInInvestor');
const getAllAssetsInTrust = require('./getAllAssetsInTrust');
const getAssetTokens = require('./getAssetTokens');
const getWallet123 = require('./getWallet123');
const validatingInitialSale = require('./validatingInitialSale');
const payBack = require('./payBack');
const reEvaluation = require('./reEvaluation');
const sellBeforeDetails = require('./sellBeforeDetails');
const sellToken = require('./sellToken');
//***************************************** */

app.use(addAssets);
app.use(addInvestors);
app.use(evalFromInvestor);
app.use(evalFromEvaluator);
app.use(tokenizationInvestor);
app.use(tokenizationByTrust);
app.use(listSaleByInvestor);
app.use(listSaleByTrust);

//***************************************** */
app.use(buyMoreToken);
app.use(buyToken);
app.use(getAllAssetsInInvestor);
app.use(getAllAssetsInTrust);
app.use(getAssetTokens);
app.use(getWallet123);
app.use(validatingInitialSale);
app.use(payBack);
app.use(reEvaluation);
app.use(sellBeforeDetails);
app.use(sellToken);
//***************************************** */

app.listen(7000, () => console.log('Server started on port 7000'));