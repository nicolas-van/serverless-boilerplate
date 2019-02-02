/*
Data access layer
*/


const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const _ = require("lodash");

/**
 * Tables in Dynamodb
 */
const EXAMPLE_TABLE = process.env.EXAMPLE_TABLE;

// Some setup for local AWS
if (process.env.IS_OFFLINE === 'true') {
  AWS.config.update({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
  });
}
AWS.config.setPromisesDependency(Promise);

// The dynamob db client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * Some helper function to make an automatic scan in dynamodb with iteration.
 * @param {*} params 
 */
const scanAll = async (params) => {
  params = Object.assign({}, params);
  let items = [];
  while (true) {
    const data = await dynamoDb.scan(params).promise();

    items = items.concat(data.Items);

    if (! data.LastEvaluatedKey) {
      break;
    }
    params.ExclusiveStartKey = data.LastEvaluatedKey;
  }
  return _.sortBy(items, "name");
}

/**
 * Get all the examples.
 */
module.exports.getExamples = async () => {
  const params = {
    TableName: EXAMPLE_TABLE,
  };
  const examples = await scanAll(params);
  return examples;
};

/**
 * Add an example
 */
module.exports.addExample = async (example) => {
  example = Object.assign({}, example);
  example.id = uuidv4();
  await dynamoDb.put({
      TableName: EXAMPLE_TABLE,
      Item: example,
  }).promise();

  return example.id;
};

/**
 * Delete an example
 */
module.exports.deleteExample = async (id) => {
  const res = await dynamoDb.delete({
    TableName: EXAMPLE_TABLE,
    Key:{
        "id": id,
    },
  }).promise();
};
