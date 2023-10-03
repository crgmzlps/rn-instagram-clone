import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Post} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';
import colors from '../../theme/colors';
import {FeedNavigationProp} from '../../types/navigation';
import Carousel from '../Carousel';
import Comment from '../Comment';
import DoublePressable from '../DoublePressable';
import VideoPlayer from '../VideoPlayer';
import styles from './styles';

interface IFeedPostProps {
  post: Post;
  isVisible: boolean;
}

const FeedPost = ({post, isVisible}: IFeedPostProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const toggleDescriptionExpanded = () =>
    setIsDescriptionExpanded(prev => !prev);

  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = () => setIsLiked(prev => !prev);

  const navigation = useNavigation<FeedNavigationProp>();
  const navigateToUser = () => {
    // navigation.push('UserProfile');
    if (post.User) {
      navigation.navigate('UserProfile', {userId: post.User?.id});
    }

    // navigation.goBack()
  };
  const navigateToComments = () => {
    // navigation.push('UserProfile');
    navigation.navigate('Comments', {postId: post.id});
    // navigation.goBack()
  };

  let content = null;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <Image
          source={{
            uri: post.image,
          }}
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} onDoublePress={toggleLike} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={toggleLike}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }
  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: post.User?.image || DEFAULT_USER_IMAGE,
          }}
          style={styles.userAvatar}
        />
        <Text onPress={navigateToUser} style={styles.userName}>
          {post.User?.username}
        </Text>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </View>
      {/* Content */}
      {content}
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleLike}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black}
            />
          </Pressable>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>
        {/* Likes */}
        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>dummy45</Text> and{' '}
          <Text style={styles.bold}>{post.nofLikes} others</Text>
        </Text>
        {/* Post description */}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
          <Text style={styles.bold}>{post.User?.username} </Text>
          {post.description}
        </Text>
        <Text onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'less' : 'more'}
        </Text>
        {/* Comments */}
        <Text onPress={navigateToComments}>
          View all {post.nofComments} comments
        </Text>
        {(post.Comments?.items || []).map(
          comment => comment && <Comment key={comment.id} comment={comment} />,
        )}

        {/* Posted Date */}
        <Text>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
