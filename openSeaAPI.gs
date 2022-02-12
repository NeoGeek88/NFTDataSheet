/* 
This function requests the asset information from OpenSea, a valid API KEY is needed.
contractAddress: The contract address for the NFT collection you want to extract.
offset: The offest to start with, the initial request normally start with 0, then added by previous limit each time.
limit: The number of assets to be requested for each query, at a maximum of 50.
Returns a JSON string including all assets information. For details check https://docs.opensea.io/reference/getting-assets
*/
function openseaListAssets(contractAddress, offset, limit){
  const requestUrlBase = "https://api.opensea.io/api/v1/assets";
  var requestUrl = requestUrlBase + "?asset_contract_address=" + contractAddress + "&order_direction=asc&offset=" + offset + "&limit=" + limit;
  var options = {};
  var headers = {
    'Accept': 'application/json',
    'X-API-KEY': '' //add your API KEY here
    };
  options.method = "get";
  options.headers = headers;
  
  var response = 0;
  Logger.log("Requesting data "+(offset+1)+" to "+(offset+50)); // for DEBUG use
  try {
    response = UrlFetchApp.fetch(requestUrl, options); //WARNING: UrlFetchApp.fetch has a daily limit of 20000 based on google document, use with care.
  } catch(e) {
    Logger.log(e);
  }

  return JSON.parse(response.getContentText());
}
