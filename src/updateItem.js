
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { 
    DynamoDBDocumentClient,
    PutCommand
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "ItemTableNew";

const updateItem = async(event) => {

    let xxxxx;

    try {

            const requestJSON = JSON.parse(event.body);
            // const {itemStatus} = JSON.parse(event.body)
            // const {id} = event.pathParameters
            
            await dynamo.send(
                new PutCommand({
                  TableName: tableName,
                  Item: {
                    id: requestJSON.id,
                    itemStatus: requestJSON.itemStatus,
                    createdAt: requestJSON.createdAt,
                    item: requestJSON.item
                  }
                })
              );

    }catch (error) {
            console.log(error)
            xxxxx = error;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
            { msg: 'Item Updated' }
        ),
    };
    
}

module.exports = {
    handler:updateItem
}