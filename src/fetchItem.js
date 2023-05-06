
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { 
    DynamoDBDocumentClient,
    GetCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "ItemTableNew";

const fetchItem = async(event) => {

    let item;

    try {

            const {id} = event.pathParameters
            
            
            const result = await dynamo.send(
                                                new GetCommand({
                                                    TableName: tableName,
                                                    Key: {id}
                                                })
                                            );
             
            item = result.Item;

    }catch (error) {
            console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item)
    };
    
}

module.exports = {
    handler:fetchItem
}