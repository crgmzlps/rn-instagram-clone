/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppSyncID = process.env.API_INSTAGRAM_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppSyncID}-${env}`;

const userExists = async id => {
  const params = {
    TableName,
    Key: id,
  };
  try {
    const response = await documentClient.get(params).promise();
    return !!response?.Item;
  } catch (e) {
    return false;
  }
};
const saveUser = async user => {
  const date = new Date();
  const timestamp = date.getTime();
  const Item = {
    ...user,
    __typename: 'User',
    _lastChangedAt: timestamp,
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
    _version: 1,
  };
  const params = {
    TableName,
    Item,
  };
  try {
    await documentClient.put(params).promise();
  } catch (e) {
    console.log(e);
  }
};

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  if (!event?.request?.userAttributes) {
    console.log('no user data available');
    return;
  }
  const {sub, name, email} = event.request.userAttributes;
  const newUser = {
    id: sub,
    name,
    email,
  };
  if (!(await userExists(newUser.id))) {
    await saveUser(newUser);
    console.log(`User ${newUser.id} hve been saved to the database`);
  } else {
    console.log(`User ${newUser.id} already exists`);
  }

  return event;
};
