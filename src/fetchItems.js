
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { 
    DynamoDBDocumentClient,
    ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "ItemTableNew";

const fetchItems = async(event) => {

    let items;
    
    try {
        
       const results = await dynamo.send(
                                            new ScanCommand({
                                                TableName: tableName
                                            })
                                        );
       items = results.Items;

        return {
            statusCode: 200,
            body: JSON.stringify(newItem)
        };

    }catch (error) {
            console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items)
    };
    
}

module.exports = {
    handler:fetchItems
}