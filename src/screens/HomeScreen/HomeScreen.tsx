import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ViewToken,
  ViewabilityConfig,
} from 'react-native';
// import posts from '../../assets/data/posts.json';
import {useQuery} from '@apollo/client';
import {ListPostsQuery, ListPostsQueryVariables} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import FeedPost from '../../components/FeedPost';
import {listPosts} from './queries';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const {data, loading, error} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts);

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

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <ApiErrorMessage title="Error fetching posts" message={error.message} />
    );
  }

  const posts = data?.listPosts?.items || [];

  return (
    <FlatList
      data={posts}
      renderItem={({item}) =>
        item && <FeedPost post={item} isVisible={activePostId === item.id} />
      }
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
  );
};

export default HomeScreen;
