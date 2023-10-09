import {gql} from '@apollo/client';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      username
      bio
      website
      nofPosts
      nofFollowers
      nofFollowings
      image
      Posts {
        items {
          id
          description
          image
          images
          video
          nofComments
          nofLikes
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Comments {
        items {
          id
          comment
          userID
          postID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Likes {
        items {
          id
          userID
          postID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id

      name
      email
      username
      bio
      website
      image

      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteUser = gql`
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id

      createdAt
      updatedAt
      __typename
    }
  }
`;
