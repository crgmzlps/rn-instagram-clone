import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  View,
  ViewToken,
  ViewabilityConfig,
  useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import DoublePressable from '../DoublePressable';

interface ICarouselProps {
  images: string[];
  onDoublePress?: () => void;
}

const Carousel = ({images, onDoublePress = () => {}}: ICarouselProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const {width} = useWindowDimensions();

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };
  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length > 0) {
        const [firstElement] = viewableItems;
        setActiveImageIndex(firstElement.index || 0);
      }
    },
  );

  return (
    <View>
      <FlatList
        // style={{flex: 1}}
        data={images}
        horizontal
        pagingEnabled
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
        renderItem={({item}) => (
          <DoublePressable onDoublePress={onDoublePress}>
            <Image
              source={{
                uri: item,
              }}
              style={{width, aspectRatio: 1}}
            />
          </DoublePressable>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              aspectRatio: 1,
              borderRadius: 5,
              backgroundColor:
                activeImageIndex === index ? colors.primary : colors.white,
              margin: 10,
              marginHorizontal: 5,
            }}></View>
        ))}
      </View>
    </View>
  );
};

export default Carousel;
