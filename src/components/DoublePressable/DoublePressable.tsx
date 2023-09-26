import React, {ReactNode} from 'react';
import {Pressable} from 'react-native';

interface IDoublePressableProps {
  onDoublePress?: () => void;
  children: ReactNode;
}

const DoublePressable = ({
  onDoublePress = () => {},
  children,
}: IDoublePressableProps) => {
  let lastTap = 0; // do not rerender the UI
  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastTap < 500) {
      onDoublePress();
    }
    lastTap = now;
  };
  return <Pressable onPress={handleDoublePress}>{children}</Pressable>;
};

export default DoublePressable;
