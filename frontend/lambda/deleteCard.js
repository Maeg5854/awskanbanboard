var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

const tableName = "Cards";

exports.handler = async (event) => {
  console.log("Received: ", JSON.stringify(event));
  let response = "";

  try {
    const id = event.pathParameters.id;

    var params = {
      TableName: tableName,
      Key: {
        id: id,
      },
    };
    await documentClient.delete(params).promise();

    response = {
      statusCode: 200,
    };
  } catch (err) {
    console.error(err);
    response = {
      statusCode: 500,
      body: JSON.stringify({ message: err }),
    };
  }
  return response;
};
