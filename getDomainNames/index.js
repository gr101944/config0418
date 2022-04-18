const { CosmosClient } = require("@azure/cosmos");
const endpoint = process.env["CosmosDBEndpoint"];
const key = process.env["CosmosDBAuthKey"];

const databaseName = process.env["DatabaseName"];
const collectionName = process.env["configCollectionName"];
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseName);
const container = database.container(collectionName);


module.exports = async function (context, req) {
  console.log ("req  " + JSON.stringify (req));

  console.log ("databaseName " + databaseName);
  console.log ("collectionName " + collectionName);     
  

  const querySpec = {
    query: "SELECT * from botConfig c" 
  };
  console.log (querySpec.query)
  
  // read all items in the Items container
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  context.res = {
      // status: 200, /* Defaults to 200 */
      body: items
  };
}