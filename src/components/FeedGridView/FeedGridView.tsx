import React from 'react';
import {FlatList} from 'react-native';
import {Post} from '../../API';
import FeedGridItem from './FeedGridItem';

interface IFeedGridViewProps {
  data: (Post | null)[];
  listHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
  refetch: () => void;
  loading: boolean;
}

const FeedGridView = ({
  data,
  listHeaderComponent = null,
  refetch,
  loading,
}: IFeedGridViewProps) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => item && <FeedGridItem post={item} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={listHeaderComponent}
      style={{marginHorizontal: -1}}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default FeedGridView;
