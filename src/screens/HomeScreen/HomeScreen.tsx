import React, {useRef, useState, useEffect} from 'react';
import {FlatList, StyleSheet, ViewToken, ViewabilityConfig} from 'react-native';
// import posts from '../../assets/data/posts.json';
import FeedPost from '../../components/FeedPost';
import {IPost} from '../../types/models';
import {API, graphqlOperation} from 'aws-amplify';

export const listPosts = `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        User {
          id
          name
          username
          image
        }
        Comments {
          items {
            id
            comment
            User {
              id
              name
            }
          }
        }
      }
      nextToken
      __typename
    }
  }
`;

const HomeScreen = () => {
  /**
   * use FlatList instead arr.map
   * FlatList have ScrollView feature
   */
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await API.graphql(graphqlOperation(listPosts));
    setPosts(response.data?.listPosts?.items);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        const [firstElement] = viewableItems;
        setActivePostId(firstElement.item?.id?.toString() || 0);
      }
    },
  );

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <FeedPost post={item as IPost} isVisible={activePostId === item.id} />
      )}
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
