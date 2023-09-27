import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {IPost} from '../../types/models';
import FeedGridItem from './FeedGridItem';

interface IFeedGridViewProps {
  data: IPost[];
  listHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

const FeedGridView = ({
  data,
  listHeaderComponent = null,
}: IFeedGridViewProps) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <FeedGridItem post={item} />}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={listHeaderComponent}
      style={{marginHorizontal: -1}}
    />
  );
};

const styles = StyleSheet.create({});

export default FeedGridView;
