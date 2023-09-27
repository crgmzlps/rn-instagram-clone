import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';

interface IVideoPlayerProps {
  uri: string;
  paused: boolean;
}

const VideoPlayer = ({uri, paused}: IVideoPlayerProps) => {
  const [muted, setMuted] = useState(true);
  return (
    <View>
      <Video
        source={{uri}}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted={muted}
        paused={paused}
      />
      <Pressable
        onPress={() => setMuted(prev => !prev)}
        style={styles.muteButton}>
           <Ionicons name={muted ? "volume-mute" : "volume-medium"} size={14} color={colors.white} />
        </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 1,
  },
  muteButton: {
    backgroundColor: colors.black,
    padding: 5,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 25
  },
});

export default VideoPlayer;
