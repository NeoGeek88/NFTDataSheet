function updateRawData(){ //update raw data
  var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(""); // add the tab name where you want the extracted information goes to here

  var contractAddress = ""; //add the contract address here for later use

  var offset, limit;
  var linesToWrite = [];
  offset = 0;
  limit = 50; //50 records for each query

  do{
    var assetList=null;

    while(assetList == null){ //this is to prevent any errors, if the result includes any error (normally error 429), it will retry after 1 second.
      try{
        assetList = openseaListAssets(contractAddress, offset, limit);
      }catch(e){
        Utilities.sleep(1000);
      }
    }

    assetList.assets.forEach(function(d, i){ //loop to check each asset
      let lineToWrite = {};
      
      //lineToWrite.push(d.dataYouWant);
      
      linesToWrite.push(lineToWrite);
    })

    offset += 50; //check next 50 assets
    Utilities.sleep(1000); // for OS API limit
  }while(offset <= 9999); //change to max number of assets of the collection
  
  dataSheet.getRange(2,1,NUMBER_OF_ROWS,NUMBER_OF_COLUMNS).setValues(linesToWrite); //indicate number of rows and columns to be set, it must be the same value with the data you get
