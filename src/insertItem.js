
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { 
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
    GetCommand,
    DeleteCommand
} = require("@aws-sdk/lib-dynamodb");

const {randomUUID} = require('crypto');

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "ItemTableNew";

const insertItem = async(event) => {
    let body;
    
    try {
        
        const item = JSON.parse(event.body);
        
        var d = new Date(Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        const createdAt = [day, month, year].join('-');
    
        const id = randomUUID();
        
        
        const newItem = {
            id,
            item,
            createdAt,
            itemStatus: false
        }

        await dynamo.send(
              new PutCommand({
                TableName: tableName,
                Item: newItem,
              })
            );
            
        return {
            statusCode: 200,
            body: JSON.stringify(newItem)
        };

    }catch (err) {
            body = err.message;
    } finally {
      body = JSON.stringify(body);
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify(body)
    };

}

module.exports = {
    handler:insertItem
}