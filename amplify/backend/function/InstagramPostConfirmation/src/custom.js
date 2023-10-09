/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const {
  PutCommand,
  DynamoDBDocumentClient,
  GetCommand,
} = require('@aws-sdk/lib-dynamodb');

const env = process.env.ENV;
const region = process.env.REGION;
const AppSyncID = process.env.API_INSTAGRAM_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppSyncID}-${env}`;

const client = new DynamoDBClient({region});
const docClient = DynamoDBDocumentClient.from(client);

const userExists = async id => {
  const command = new GetCommand({
    TableName,
    Key: id,
  });

  try {
    const response = await docClient.send(command);
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

  const command = new PutCommand({
    TableName,
    Item,
  });

  try {
    await docClient.send(command);
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
    nofPosts: 0,
    nofFollowers: 0,
    nofFollowings: 0,
  };
  if (!(await userExists(newUser.id))) {
    await saveUser(newUser);
    console.log(`User ${newUser.id} hve been saved to the database`);
  } else {
    console.log(`User ${newUser.id} already exists`);
  }

  return event;
};
