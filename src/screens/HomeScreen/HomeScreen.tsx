import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, ViewToken, ViewabilityConfig} from 'react-native';
import posts from '../../assets/data/posts.json';
import FeedPost from '../../components/FeedPost';
import {IPost} from '../../types/models';

const HomeScreen = () => {
  /**
   * use FlatList instead arr.map
   * FlatList have ScrollView feature
   */
  const [activePostId, setActivePostId] = useState<string | null>(null);

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
