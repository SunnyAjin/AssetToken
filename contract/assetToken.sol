pragma solidity ^0.5.0;

import "./BokkyPooBahsDateTimeLibrary.sol";

contract assetToken{
    
     using BokkyPooBahsDateTimeLibrary for uint;
    
    address evaluator;
    address trust;
    
    enum Status {created,owned,evaluated,requestForToken,tokenized,onSale}
    
    
    struct Token{
        bytes32 assetId;
        bytes32 tokenName;
        uint totalSupply;
        uint totalSupplyBalance;
        uint perTokenPrice;
      
    }
    struct Investor{
        bytes32 name;
        bytes32 password;
        bytes32 email;
        uint bankAccount;
        uint phone;
        bytes32 gender;
        bytes32[] tokensHolding;
        mapping(bytes32 => uint) numberOfTokenHolding;
        mapping(bytes32=> uint) ownedSince;
        bytes32[] assetsHolding;
    }
    struct Wallet{
        address investor;
        uint purchasePrice;
        uint totalTokenHolding;
        uint currentPrice;
        uint investmentReturn;
         }
         
    struct Asset{
        bytes32 assetId;
        bytes32 assetName;
        bytes32 assetType;
        bytes32 assetBrand;
        uint purchasePrice;
        uint assetWeight;
        string description;
        string imageHash;
        address owner;
        Status status;
    }
    struct SaleDetail{
       bytes32 assetId;
        uint evaluatedPrice;
        uint listingValidTill;
        uint maxToken;
        uint minToken;
        uint askingPrice;
        uint listingStatus;
        bytes32 sellId;
        uint evaluatedPricePerToken;
        uint reEvaluatedPrice;
    }
    struct Sell{
        bytes32 sellId;
        bytes32 assetId;
        address investorHolding;
        uint investorTokenHolding;
        uint initialSaleStatus;
        address[] investorsBuyed;
        mapping (address =>uint) tokensBuyed;
        uint tokenCount;
        uint tokenToSell;
    
        
    }
    struct AssetToken{
        bytes32 assetId;
        address[] investorsHoldingToken;
        mapping (address=>uint) tokensHoldingByInvestor;
    }
    
        
    mapping (address=> Investor) investors;
    mapping (bytes32 => Token) tokens;
    mapping (address=> Wallet) wallets;
    mapping (bytes32 => Asset) assets;
    mapping (bytes32 =>SaleDetail) saleDetails;
    mapping (bytes32 =>Sell) sells;
    mapping(bytes32 =>AssetToken) assetTokens;
    
    
    address[] allInvestors;
    bytes32[] allAssets;
    bytes32[] allTokens;
    bytes32[] allSells;
    bytes32[] allAssetToken;
    
    constructor() public{
    trust=0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    evaluator=0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C;
    }
    
    modifier onlyEvaluator{
         require(msg.sender == evaluator);
        _;
    }
    
    modifier onlyTrust{
         require(msg.sender == trust);
        _;
    }
    
    function timestampFromDate(uint year, uint month, uint day) public pure returns (uint timestamp) {
        
         return BokkyPooBahsDateTimeLibrary.timestampFromDate(year, month, day);
        
    }
    
    function addUser(address addres,bytes32 name, bytes32 password, bytes32 email,uint bankAccount, uint phone, bytes32 gender) public returns(bool){
    investors[addres].name=name;
    investors[addres].password=password;
    investors[addres].email=email;
    investors[addres].bankAccount=bankAccount;
    investors[addres].phone=phone;
    investors[addres].gender=gender;
    return true; 
    }
    
    function addAsset(bytes32 assetId,bytes32 assetName,bytes32 assetType,bytes32 brand,uint purchasePrice,uint assetWeight,string memory description,string memory imageHash,uint year,uint month,uint day) public returns(bool){
        assets[assetId].assetId=assetId;
        assets[assetId].assetName=assetName;
        assets[assetId].assetType=assetType;
        assets[assetId].assetBrand=brand;
        assets[assetId].purchasePrice=purchasePrice;
        assets[assetId].assetWeight=assetWeight;
        assets[assetId].description=description;
        assets[assetId].imageHash=imageHash;
        assets[assetId].owner=msg.sender;
        allAssets.push(assetId);
        assets[assetId].status=Status.created;
        
        investors[msg.sender].tokensHolding.push(assetId);
        
        uint timeStamp=timestampFromDate(year,month,day);
       
        investors[msg.sender].ownedSince[assetId]=timeStamp;

        return true;
    }
    
    function evaluateFromInvestor(bytes32 assetId)public returns(bool){
        require(Status.created==assets[assetId].status);
        assets[assetId].status=Status.owned;
        
        return true;
    }
    function evaluateFromEvaluator(bytes32 assetId,uint price) public onlyEvaluator returns (bool){
    require((Status.owned)==assets[assetId].status);
    saleDetails[assetId].assetId=assetId;
    saleDetails[assetId].evaluatedPrice=price;
    assets[assetId].status=Status.evaluated;
    
    return true;
    }
    
    function tokenFromInvestor(bytes32 assetId, uint total)public returns(bool){
        require((Status.evaluated)==assets[assetId].status);
         
        tokens[assetId].assetId=assetId;
        tokens[assetId].tokenName=assets[assetId].assetName;
        tokens[assetId].totalSupply=total;
        tokens[assetId].totalSupplyBalance=total;
        tokens[assetId].perTokenPrice=assets[assetId].purchasePrice/total;
      
        assetTokens[assetId].assetId=assetId;
        assetTokens[assetId].investorsHoldingToken.push(msg.sender);
        assetTokens[assetId].tokensHoldingByInvestor[msg.sender]=total;
        allAssetToken.push(assetId);
            
        investors[msg.sender].numberOfTokenHolding[assetId]=total;
     
      
        assets[assetId].status=Status.requestForToken;
        return true;
    }
    
    
    function tokenFromTrust(bytes32 assetId) public onlyTrust returns(bool){
         require((Status.requestForToken)==assets[assetId].status);
        assets[assetId].status=Status.tokenized;
        saleDetails[assetId].evaluatedPricePerToken=saleDetails[assetId].evaluatedPrice/tokens[assetId].totalSupply;
        
        return true;
    }
    function listSaleFromInvestor(bytes32 assetId, uint year, uint month, uint day,uint maxToken, uint minToken,uint askingPrice, bytes32 sellId) public returns(bool){
        require((Status.tokenized)==assets[assetId].status);
        
        uint timeStamp=timestampFromDate(year,month,day);
        
        saleDetails[assetId].listingValidTill=timeStamp;
        saleDetails[assetId].maxToken=maxToken;
        saleDetails[assetId].minToken=minToken;
        saleDetails[assetId].askingPrice=askingPrice;
        saleDetails[assetId].sellId=sellId;
        // assets[assetId].status=Status.listSale;
        
        sells[sellId].sellId=sellId;
        sells[sellId].assetId=assetId;
        sells[sellId].investorHolding=msg.sender;
        sells[sellId].investorTokenHolding=tokens[assetId].totalSupply;
        sells[sellId].initialSaleStatus=0;
        allSells.push(sellId);
        
        assets[assetId].status=Status.onSale;
        saleDetails[assetId].listingStatus=0;
        
        
        return true;
    }
    
    // function listSaleFromTrust(bytes32 assetId) public returns(bool){
    //     require((Status.listSale)==assets[assetId].status);
        
        
    //     return true;
    // }
    
    function buyMoreTokenArray() public view returns(bytes32[] memory){
      return allSells;  
      
    }
    
    function buyMoreToken(bytes32 sellId) public view returns(bytes32,string memory,uint,bytes32){
        bytes32 assetId=sells[sellId].assetId;
        require(Status.onSale==assets[assetId].status);
        
        return (assets[assetId].assetId,assets[assetId].imageHash,saleDetails[assetId].askingPrice,sellId);
    }
    
    function viewMoreToken(bytes32 sellId) public view returns(bytes32,uint,uint,uint,string memory,bytes32){
        bytes32 assetId=sells[sellId].assetId;
        
        require(Status.onSale==assets[assetId].status);
        if(sells[sellId].initialSaleStatus==0){
            return( assetId,tokens[assetId].totalSupplyBalance,saleDetails[assetId].evaluatedPricePerToken,saleDetails[assetId].askingPrice,assets[assetId].imageHash,sellId);
        }
        else{
            return(assetId,sells[sellId].investorTokenHolding,saleDetails[assetId].evaluatedPricePerToken,saleDetails[assetId].askingPrice,assets[assetId].imageHash,sellId );
        }
    }
    
    function buyDetails1(bytes32 sellId) public view returns(bytes32,bytes32,string memory,bytes32,uint,string memory,uint){
         bytes32 assetId=sells[sellId].assetId;
         require(Status.onSale==assets[assetId].status);
         
          if(sells[sellId].initialSaleStatus==0){
            return (assets[assetId].assetName,assets[assetId].assetType,assets[assetId].imageHash,assets[assetId].assetBrand,assets[assetId].assetWeight,assets[assetId].description,assets[assetId].purchasePrice);
        }
        else{
            return (assets[assetId].assetName,assets[assetId].assetType,assets[assetId].imageHash,assets[assetId].assetBrand,assets[assetId].assetWeight,assets[assetId].description,assets[assetId].purchasePrice);
        }
    }
    
    function buyDetails2(bytes32 sellId) public view returns(uint,uint,uint,bytes32){
        bytes32 assetId=sells[sellId].assetId;
         require(Status.onSale==assets[assetId].status);
         
          if(sells[sellId].initialSaleStatus==0){
            return (saleDetails[assetId].evaluatedPricePerToken,saleDetails[assetId].askingPrice,tokens[assetId].totalSupplyBalance,sellId);
        }
        else{
            return (saleDetails[assetId].evaluatedPricePerToken,saleDetails[assetId].askingPrice,sells[sellId].tokenToSell,sellId);
            
        }
    }
    
    function buyToken(bytes32 sellId,uint tokenReq,uint year, uint month, uint day) public returns(bool){
    
        bytes32 assetId=sells[sellId].assetId;
         require(Status.onSale==assets[assetId].status);
         
          if(sells[sellId].initialSaleStatus==0){
              if(tokens[assetId].totalSupplyBalance>=tokenReq){
                  
              tokens[assetId].totalSupplyBalance -=tokenReq;
              
              investors[sells[sellId].investorHolding].numberOfTokenHolding[assetId] -=tokenReq;
              
               uint timeStamp=timestampFromDate(year,month,day);
              
              investors[msg.sender].tokensHolding.push(assetId);
              investors[msg.sender].numberOfTokenHolding[assetId]=tokenReq;
              investors[msg.sender].ownedSince[assetId]=timeStamp;
              
              sells[sellId].investorsBuyed.push(msg.sender);
              sells[sellId].tokensBuyed[msg.sender]=tokenReq;
              sells[sellId].tokenCount +=tokenReq;
              
              assetTokens[assetId].investorsHoldingToken.push(msg.sender);
              assetTokens[assetId].tokensHoldingByInvestor[msg.sender]=tokenReq; 
              allAssetToken.push(assetId);
              
              return true;
              }
        }
        else{
            if(sells[sellId].investorTokenHolding>=tokenReq){
                require(sells[sellId].tokenToSell>=tokenReq);
               
                if(investors[msg.sender].numberOfTokenHolding[assetId]>0){
                    
                    investors[msg.sender].numberOfTokenHolding[assetId]+=tokenReq;
                     sells[sellId].investorTokenHolding-=tokenReq;
                     address investLooser=sells[sellId].investorHolding;
                     investors[investLooser].numberOfTokenHolding[assetId]-=tokenReq;
                     sells[sellId].tokenToSell-=tokenReq;
                     
                     assetTokens[assetId].tokensHoldingByInvestor[msg.sender]+=tokenReq;
                     
                     sells[sellId].investorsBuyed.push(msg.sender);
                     sells[sellId].tokensBuyed[msg.sender]=tokenReq;
                     
                     return true;
                    
                }
                else{
                    
                    
                    investors[msg.sender].tokensHolding.push(assetId);
                    investors[msg.sender].numberOfTokenHolding[assetId]+=tokenReq;
                    sells[sellId].investorTokenHolding-=tokenReq;
                    address investLooser=sells[sellId].investorHolding;
                    investors[investLooser].numberOfTokenHolding[assetId]-=tokenReq;
                    sells[sellId].tokenToSell-=tokenReq;
                      
                      assetTokens[assetId].investorsHoldingToken.push(msg.sender);
                     assetTokens[assetId].tokensHoldingByInvestor[msg.sender]=tokenReq;
                     allAssetToken.push(assetId);
                     return true;
                
                }
            }
         }
    }
    
    function sellArray() public view returns(bytes32[] memory){
        bytes32[] memory assetIds=investors[msg.sender].tokensHolding;
        return assetIds;
    }
    function sellBeforeDetails(bytes32 assetId) public view returns(uint,uint,uint,uint,uint,bytes32){
        uint purchasePricePerToken=assets[assetId].purchasePrice/tokens[assetId].totalSupply;
        uint tokenOwned=investors[msg.sender].numberOfTokenHolding[assetId];
        return (saleDetails[assetId].evaluatedPricePerToken,purchasePricePerToken,tokenOwned,tokens[assetId].totalSupply,investors[msg.sender].ownedSince[assetId],assetId);
    }
    
    function sellDetails2(bytes32 assetId) public view returns(uint,uint,uint,bytes32){
        return (saleDetails[assetId].evaluatedPricePerToken,saleDetails[assetId].askingPrice,investors[msg.sender].numberOfTokenHolding[assetId],assetId);
    }
    
    function sellToken(bytes32 sellId, bytes32 assetId, uint tokenReq) public returns(bool){
        require(Status.onSale==assets[assetId].status);
        require(investors[msg.sender].numberOfTokenHolding[assetId]>=tokenReq);
       
        sells[sellId].tokenToSell=tokenReq;
        
        sells[sellId].sellId=sellId;
        sells[sellId].assetId=assetId;
        sells[sellId].investorHolding=msg.sender;
        sells[sellId].investorTokenHolding=tokenReq;
        sells[sellId].initialSaleStatus=1;
      
        return true;
    }
    
    function getInvestor(address investor) public view returns(bytes32,bytes32,bytes32,bytes32,bytes32[] memory,bytes32[] memory){
       
       return (investors[investor].name,investors[investor].password,investors[investor].email,investors[investor].gender,investors[investor].tokensHolding,investors[investor].assetsHolding);
    }
    
    function getInvestorTokenDetails(bytes32 asset) public view returns(uint,uint){
        
        return (investors[msg.sender].numberOfTokenHolding[asset],investors[msg.sender].ownedSince[asset]);
     
    }
    
    function getAllAssets() public view returns(bytes32[] memory){
        return allSells;    
    }   
    
    function getAllAssetsInInvestor() public view returns(bytes32[] memory){
        return investors[msg.sender].tokensHolding;
    }
    
    
    // function getAllAssetsInTrust(bytes32 assetId) public view returns(bytes32[] memory){
    //     require(Status.tokenized<=assets[assetId].status);
        
    // }
    
    function getAssetInInvestor(bytes32 asset) public view returns(bytes32,bytes32,bytes32,uint,string memory,uint,string memory,Status,bytes32){
        
        address owner=assets[asset].owner;
        bytes32 ownerName=investors[owner].name;
        Asset memory assetId=assets[asset];
        return (assetId.assetName,assetId.assetType,ownerName,assetId.purchasePrice,assetId.description,assetId.assetWeight,assetId.imageHash,assetId.status,assetId.assetId);
    }
    
   function getTokenDetails(bytes32 assetId) public view returns(uint,uint,uint,uint,uint,uint){

    if(saleDetails[assetId].listingStatus==0){
        
        return (saleDetails[assetId].evaluatedPrice,tokens[assetId].totalSupply,saleDetails[assetId].evaluatedPricePerToken,saleDetails[assetId].askingPrice,saleDetails[assetId].maxToken,sells[saleDetails[assetId].sellId].tokenCount);
        }
        else{
        
        uint totalOwners=assetTokens[assetId].investorsHoldingToken.length;
        return (saleDetails[assetId].evaluatedPrice,tokens[assetId].totalSupply,totalOwners,saleDetails[assetId].evaluatedPricePerToken,saleDetails[assetId].askingPrice,assets[assetId].purchasePrice);
        }
    }
    
    
    function getSaleDetails(bytes32 asset) public view returns(bytes32,uint,uint){
        return( saleDetails[asset].assetId,saleDetails[asset].listingStatus,saleDetails[asset].evaluatedPricePerToken);
    }
    
    function getAssetTokenArray() public view returns(bytes32[] memory){
        return allAssetToken;
    }
    
    function getAssetTokens(bytes32 asset) public view returns(address[] memory,bytes32){
        
        return (assetTokens[asset].investorsHoldingToken,asset);
    }
    function getAssetToken(bytes32 asset, address investor) public view returns(uint,string memory){
        string memory present="absent";
          if(assetTokens[asset].tokensHoldingByInvestor[investor]>0){
              present="present";
          }
          return (assetTokens[asset].tokensHoldingByInvestor[investor],present);
    }
    
    
    
    function validatingInitialSale(bytes32 assetId,uint year,uint month,uint day) public returns(address[] memory,string memory,bytes32){
        bytes32 sellId=saleDetails[assetId].sellId;
        string memory condition;
         uint currentDate=timestampFromDate(year,month,day);
         
        
        require(Status.onSale==assets[assetId].status);
        if(currentDate>=saleDetails[assetId].listingValidTill){
            uint tokenSold=tokens[assetId].totalSupply-tokens[assetId].totalSupplyBalance;
            if(saleDetails[assetId].minToken>tokenSold){
                
                condition="fail";
                return (sells[sellId].investorsBuyed,condition,sellId);
            }
            else{
                sells[sellId].initialSaleStatus=1;
                saleDetails[assetId].listingStatus=1;
                condition="success";
                
                return (sells[sellId].investorsBuyed,condition,sellId);
            }
        }
    }
    
    function payBack(bytes32 sellId,address investor) public returns(bool){
        
        uint token=sells[sellId].tokensBuyed[investor];
        investors[investor].numberOfTokenHolding[sells[sellId].assetId]-=token;
        assetTokens[sells[sellId].assetId].tokensHoldingByInvestor[investor]-=token;
        sells[sellId].tokensBuyed[investor] -=token;
        sells[sellId].tokenCount -=token;
        
       
       address owner= sells[sellId].investorHolding;
       
       sells[sellId].investorTokenHolding+=token;
       assetTokens[sells[sellId].assetId].tokensHoldingByInvestor[owner]+=token;
       investors[owner].numberOfTokenHolding[sells[sellId].assetId]+=token;
       tokens[sells[sellId].assetId].totalSupplyBalance +=token;
       
       return true;
        
    }
    
     function getAssetForReEvaluation(bytes32 asset) public view returns(uint,uint,uint){
         require(Status.onSale==assets[asset].status);
        return (tokens[asset].totalSupply,saleDetails[asset].evaluatedPrice,saleDetails[asset].askingPrice);
    }
    
    function setReEvaluation(bytes32 asset,uint newPrice) public returns(bool){
        saleDetails[asset].reEvaluatedPrice=newPrice;
        return true;
        
    }
    
    function getWallet1() public view returns(bytes32[] memory){
        return investors[msg.sender].tokensHolding;
    }
    function getWallet2(bytes32 token) public view returns(uint){
        return investors[msg.sender].numberOfTokenHolding[token];
    }
    
    function getWallet3(uint totalToken,bytes32 token) public view returns(uint,uint,uint){
        uint pp=saleDetails[token].askingPrice*totalToken;
        uint cp=saleDetails[token].evaluatedPricePerToken**totalToken;
        return (totalToken,pp,cp);
    }
   
}