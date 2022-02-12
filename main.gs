var CONTRACT_ADDRESS = "" //set the contract address you want to check here
var MAX_SUPPLY = 9999 //set the number of assets in the NFT collection

function updateRawData(){ //update raw data
  var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(""); // add the tab name where you want the extracted information goes to here

  var offset, limit;
  var linesToWrite = [];
  offset = 0;
  limit = 50; //50 records for each query

  do{ //loop to get the asset information for the whole collection, 50 each time
    var assetList=null;

    while(assetList == null){ //this is to prevent any errors, if the result includes any error (normally error 429), it will retry after 1 second.
      try{
        assetList = openseaListAssets(CONTRACT_ADDRESS, offset, limit);
      }catch(e){
        Utilities.sleep(1000);
      }
    }

    assetList.assets.forEach(function(d, i){ //loop to check each asset
      let lineToWrite = [];
      
      //**The following code is for example only, you will need to add your own code to get what you want.**
      //**Simply use lineToWrite.push() function to push any data you want to the array, the data will be then write to the sheet with the same sequence you added them.**
      //**Add checks for possible null values and push an empty string to the array ('') for any null value, otherwise error may occured.**
      
      //lineToWrite.push(d.token_id);
      //lineToWrite.push(d.owner.address);
      //if(info.owner.user != null){
      //      lineToWrite.push(info.owner.user.username);
      //    }else{
      //      lineToWrite.push("-");
      //    }
      
      //**End of example**
      
      linesToWrite.push(lineToWrite);
    })

    offset += 50; //check next 50 assets
    Utilities.sleep(1000); // for OS API limit, change at you own convenience
  }while(offset < MAX_SUPPLY); //max number of assets of the collection
  
  dataSheet.getRange(2,1,linesToWrite.length,linesToWrite[0].length).setValues(linesToWrite); //The value will be copied to the data sheet from the 2nd row. indicate number of rows and columns to be set, it will be the same value with the data you get

}
